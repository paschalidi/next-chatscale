import * as React from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ChatProviderProps } from "./types";
import { config } from "../../config";
import { Message } from "../../components/Messages/types";

interface ChatContextType {
  organizationToken: string;
  channelName: string;
  isConnected: boolean;
  currentUserId: string;
  currentUserName?: string;
  wsEndpoint: string;
  ws: WebSocket | null;
  messages: Message[];
}

const ChatContext = React.createContext<ChatContextType | null>(null);

export const ChatProvider: React.FC<ChatProviderProps> = ({
                                                            children,
                                                            organizationToken,
                                                            channelName,
                                                            userId,
                                                            userName,
                                                            options = {
                                                              reconnectInterval: 3000,
                                                              maxReconnectAttempts: 5,
                                                              debug: false
                                                            }
                                                          }) => {
  const wsEndpoint = useMemo(() => `${config.rust_ws_url}/chat/${channelName}`, [channelName]);
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef<WebSocket | null>(null);
  const reconnectAttempts = useRef(0);
  const reconnectTimeout = useRef<number>();
  const [messages, setMessages] = useState<Message[]>([]);

  const connect = useCallback(() => {
    // Close existing connection if it exists
    if (ws.current) {
      ws.current.close();
      ws.current = null;
    }

    try {
      ws.current = new WebSocket(wsEndpoint);

      ws.current.onopen = () => {
        setIsConnected(true);
        reconnectAttempts.current = 0;
        if (options.debug) {
          console.log('Connected to WebSocket');
        }
      };

      ws.current.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (options.debug) {
          console.log('Received message:', data);
        }

        // Add new message to state
        setMessages(prev => [...prev, {
          id: crypto.randomUUID(),
          user_id: data.user_id,
          username: data.username,
          room_id: data.room_id,
          content: data.content,
          timestamp: Date.now()
        }]);
      };

      ws.current.onclose = () => {
        setIsConnected(false);
        if (reconnectAttempts.current < (options.maxReconnectAttempts || 5)) {
          reconnectTimeout.current = window.setTimeout(connect, options.reconnectInterval);
          reconnectAttempts.current += 1;
          if (options.debug) console.log(`Reconnect attempt ${reconnectAttempts.current}`);
        }
      };

      ws.current.onerror = (error) => {
        if (options.debug) console.error('WebSocket error:', error);
      };

    } catch (error) {
      if (options.debug) console.error('WebSocket connection error:', error);
    }
  }, [wsEndpoint, options]);

  useEffect(() => {
    // Reconnect when channelName changes
    connect();

    return () => {
      if (reconnectTimeout.current) {
        window.clearTimeout(reconnectTimeout.current);
      }
      if (ws.current) {
        ws.current.close();
        ws.current = null;
      }
    };
  }, [channelName, connect]); // Add channelName and connect to dependency array

  const value = useMemo(() => ({
    organizationToken,
    channelName,
    wsEndpoint,
    isConnected,
    messages,
    ws: ws.current,
    currentUserId: userId,
    currentUserName: userName
  }), [organizationToken, channelName, wsEndpoint, isConnected, messages, userId, userName]);

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