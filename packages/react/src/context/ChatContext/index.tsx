import * as React from 'react';
import { useMemo } from 'react';
import { useChannels } from "./useChannels";
import { useWebSocket } from "./useWebsocket";
import { useChannelMessages } from "./useChannelMessage";
import { config } from "../../config";
import { ChannelsResponseDto, CombinedMessagesDto } from "../../types";

interface Resource<T> {
  data: T | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

interface ChatContextType {
  apiKey: string;
  organizationId: string;
  activeChannel: {
    name: string;
    id: string | undefined;
  }
  currentUser: {
    id: string;
    userName: string;
    isConnected: boolean;
  }
  wsEndpoint: string;
  ws: WebSocket | null;
  messages: Resource<CombinedMessagesDto>;
  channels: Resource<ChannelsResponseDto>;
}

interface ChatProviderProps {
  children: React.ReactNode;
  apiKey: string;
  appId: string;
  channelName: string;
  userId: string;
  userName?: string;
  options?: {
    reconnectInterval?: number;
    maxReconnectAttempts?: number;
    debug?: boolean;
  };
}


const ChatContext = React.createContext<ChatContextType | null>(null);

export const ChatProvider: React.FC<ChatProviderProps> = ({
                                                            children,
                                                            apiKey: apiKey = 'sk_50c034d4-c6b3-4f4f-8c47-f62e17897f90',
                                                            appId: organizationId = 'f5459909-bbff-4fda-b2a0-9dd5add18f95',
                                                            channelName,
                                                            userId,
                                                            userName = 'Unknown user',
                                                          }) => {
  const { isConnected, messages: wsMessages, ws } = useWebSocket(channelName);
  const {
    channels,
    isChannelsLoading,
    channelsError,
    refetchChannels,
    currentChannelId
  } = useChannels({ channelName, organizationId, apiKey });

  console.log({
    apiKey, organizationId
  })
  const {
    messages: channelMessages,
    areMessagesLoading,
    refetchMessages,
    messagesError
  } = useChannelMessages({
    channelId: currentChannelId,
    organizationId,
    apiKey
  });

  const value = useMemo<ChatContextType>(() => ({
    apiKey,
    organizationId,
    currentUser: {
      id: userId,
      userName: userName,
      isConnected,

    },
    activeChannel: {
      name: channelName,
      id: currentChannelId
    },
    channels: {
      data: channels,
      isLoading: isChannelsLoading,
      error: channelsError,
      refetch: refetchChannels
    },
    messages: {
      data: [...(channelMessages || []), ...(wsMessages || [])],
      isLoading: areMessagesLoading,
      error: messagesError,
      refetch: refetchMessages
    },
    wsEndpoint: `${config.rust_ws_url}/chat/${channelName}`,
    ws,
  }), [
    apiKey,
    organizationId,
    channelName,
    currentChannelId,
    isConnected,
    channelMessages,
    wsMessages,
    areMessagesLoading,
    messagesError,
    refetchMessages,
    ws,
    userId,
    userName,
    channels,
    isChannelsLoading,
    channelsError,
    refetchChannels
  ]);

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = React.useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};