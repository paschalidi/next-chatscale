import * as React from 'react';
import { useMemo } from 'react';
import { useChannels } from "./useChannels";
import { useWebSocket } from "./useWebsocket";
import { useChannelMessages } from "./useChannelMessage";
import { config } from "../../config";
import { ChannelsResponseDto, MessageRequestDto, MessageResponseDto, CombinedMessagesDto } from "../../types";

interface Resource<T> {
  data: T | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

interface ChatContextType {
  organizationToken: string;
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
  organizationToken: string;
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
                                                            organizationToken,
                                                            channelName,
                                                            userId,
                                                            userName = 'Unknown user',
                                                            options = {
                                                              reconnectInterval: 3000,
                                                              maxReconnectAttempts: 5,
                                                              debug: false
                                                            }
                                                          }) => {
  const { isConnected, messages: wsMessages, ws } = useWebSocket(channelName);
  const {
    channels,
    isChannelsLoading,
    channelsError,
    refetchChannels,
    currentChannelId
  } = useChannels({ channelName });
  const {
    messages: channelMessages,
    areMessagesLoading,
    refetchMessages,
    messagesError
  } = useChannelMessages(currentChannelId);

  const value = useMemo<ChatContextType>(() => ({
    organizationToken,
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
    organizationToken,
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