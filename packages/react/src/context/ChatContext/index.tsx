'use client'
import * as React from 'react';
import { ChatProviderProps } from "./types";

interface ChatContextType {
  organizationToken: string;
  wsEndpoint: string;
  isConnected: boolean;
  ws: WebSocket | null;
}

const Index = React.createContext<ChatContextType | null>(null);

interface Message {
  id: string;
  user_id: string;
  room_id: string;
  content: string;
  timestamp: number;
}


export const ChatProvider: React.FC<ChatProviderProps> = ({
                                                            children,
                                                            organizationToken,
                                                            wsEndpoint,
                                                            options = {
                                                              reconnectInterval: 3000,
                                                              maxReconnectAttempts: 5,
                                                              debug: false
                                                            }
                                                          }) => {
  const [isConnected, setIsConnected] = React.useState(false);
  const ws = React.useRef<WebSocket | null>(null);
  const reconnectAttempts = React.useRef(0);
  const reconnectTimeout = React.useRef<number>();
  const [messages, setMessages] = React.useState<Message[]>([]);

  const connect = React.useCallback(() => {
    console.log('Connecting to WebSocket', wsEndpoint);
    try {
      if (ws.current) {
        ws.current.close();
      }

      ws.current = new WebSocket(wsEndpoint);

      ws.current.onopen = () => {
        setIsConnected(true);
        reconnectAttempts.current = 0;
        if (options.debug) console.log('Connected to WebSocket');
      };

      ws.current.onmessage = (event) => {
        console.log('Received message:', event.data);
        const data = JSON.parse(event.data);
        if (options.debug) console.log('Received message:', data);

        // Add new message to state
        setMessages(prev => [...prev, {
          id: crypto.randomUUID(),
          user_id: "data.user_id", // @todo get a real user_id
          room_id: "data.user_id",
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
  }, [wsEndpoint]);

  React.useEffect(() => {
    console.log('ChatProvider mounted');
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
  }, []);

  const value = React.useMemo(() => ({
    organizationToken,
    wsEndpoint,
    isConnected,
    ws: ws.current
  }), [organizationToken, wsEndpoint, isConnected]);

  return (
    <Index.Provider value={value}>
      {children}
    </Index.Provider>
  );
};

export const useChat = () => {
  const context = React.useContext(Index);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};