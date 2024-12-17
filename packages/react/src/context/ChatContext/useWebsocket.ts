import { useCallback, useEffect, useRef, useState } from 'react';
import { config } from "../../config";
import { MessageRequestDto } from "../../types";

interface WebSocketOptions {
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
  debug?: boolean;
}

export function useWebSocket(channelName: string, options: WebSocketOptions = {}) {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<MessageRequestDto[]>([]);
  const ws = useRef<WebSocket | null>(null);
  const reconnectAttempts = useRef(0);
  const reconnectTimeout = useRef<number>();

  const connect = useCallback(() => {
    if (ws.current) {
      ws.current.close();
      ws.current = null;
    }

    try {
      ws.current = new WebSocket(`${config.rust_ws_url}/chat/${channelName}`);

      ws.current.onopen = () => {
        setIsConnected(true);
        reconnectAttempts.current = 0;
        if (options.debug) {
          console.log('Connected to WebSocket!')
        }
      };

      ws.current.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (options.debug) {
          console.log('Received message:', data);
        }

        setMessages(prev => [...prev, {
          participant_id: data.participant_id,
          channel_name: data.channel_name,
          content: data.content,
        }]);
      };

      ws.current.onclose = () => {
        setIsConnected(false);
        if (reconnectAttempts.current < (options.maxReconnectAttempts || 5)) {
          reconnectTimeout.current = window.setTimeout(connect, options.reconnectInterval);
          reconnectAttempts.current += 1;
        }
      };

      ws.current.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    } catch (error) {
      if (options.debug) console.error('WebSocket error:', error);
    }
  }, [channelName, options]);

  useEffect(() => {
    connect();
    return () => {
      if (reconnectTimeout.current) {
        window.clearTimeout(reconnectTimeout.current);
      }
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [channelName, connect]);

  return { isConnected, messages, ws: ws.current };
}