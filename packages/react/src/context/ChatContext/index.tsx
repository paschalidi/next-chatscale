import * as React from 'react';
import { ChatProviderProps } from "./types";
import { config } from "../../config";

interface ChatContextType {
  organizationToken: string;
  channelName: string;
  isConnected: boolean;
  wsEndpoint: string;
  ws: WebSocket | null;
  messages: Message[];
}
const ChatContext = React.createContext<ChatContextType | null>(null);

interface Message {
  id: string;
  user_id: string;
  room_id: string;
  content: string;
  timestamp: number;
}

const getChannelName = () => {
  if (typeof window !== 'undefined') {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get('cn') || 'public';
  }
  return 'public'; // Default fallback
};

export const ChatProvider: React.FC<ChatProviderProps> = ({
                                                            children,
                                                            organizationToken,
                                                            options = {
                                                              reconnectInterval: 3000,
                                                              maxReconnectAttempts: 5,
                                                              debug: false
                                                            }
                                                          }) => {
  const channelName = getChannelName();
  const wsEndpoint = `${config.rust_ws_url}/chat/${channelName}`;
  const [isConnected, setIsConnected] = React.useState(false);
  const ws = React.useRef<WebSocket | null>(null);
  const reconnectAttempts = React.useRef(0);
  const reconnectTimeout = React.useRef<number>();
  const [messages, setMessages] = React.useState<Message[]>([]);

  const connect = React.useCallback(() => {
    console.log('Connecting to WebSocket', wsEndpoint);
    try {
      ws.current = new WebSocket(wsEndpoint);

      ws.current.onopen = () => {
        setIsConnected(true);
        reconnectAttempts.current = 0;
        if (options.debug) console.log('Connected to WebSocket');
      };

      ws.current.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (options.debug) {
          console.log('Received message:', data);
        }

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
    channelName,
    wsEndpoint,
    isConnected,
    messages,
    ws: ws.current
  }), [organizationToken, wsEndpoint, isConnected,messages]);

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