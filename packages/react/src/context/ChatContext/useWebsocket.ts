import { useEffect, useRef, useState } from 'react';
import { config } from "../../config";
import { MessageRequestDto } from "../../types";

export function useWebSocket(channelName: string) {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<MessageRequestDto[]>([]);
  const ws = useRef<WebSocket | null>(null);


  useEffect(() => {
    const connect = () => {
      // Only create a new connection if there isn't one already
      console.log('Connecting to WebSocket the ', channelName);
      ws.current = new WebSocket(`${config.rust_ws_url}/chat/${channelName}`);

      ws.current.onopen = () => {
        setIsConnected(true);
        console.log('WebSocket connected');
      };

      ws.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setMessages(prev => [...prev, {
          participant_id: data.participant_id,
          channel_name: data.channel_name,
          content: data.content,
        }]);
      };

      ws.current.onclose = () => {
        setIsConnected(false);
        console.log('WebSocket closed');
      };
    };

    connect();

    // Cleanup function
    return () => {
      // Only close if connection exists and is open
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.close();
      }
    };
  }, [channelName]);

  return { isConnected, messages, ws: ws.current };
}