import * as React from 'react';
import { MessageInputProps } from './types';
import { useChat } from '../../context/ChatContext';
import { postMessage } from "../../services";
import { MessageRequestDto } from "../../types";

export const MessageInput: React.FC<MessageInputProps> = ({
                                                            placeholder = 'Type a message...',
                                                            onSend,
                                                            maxLength = 1000,
                                                            disabled = false,

                                                          }) => {
  const [message, setMessage] = React.useState('');
  const {
    ws,
    currentUser: {
      id: currentUserId,
      isConnected
    },
    activeChannel: {
      name: channelName
    },
  } = useChat();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && ws && isConnected) {
      const data = {
        channel_name: channelName,
        participant_id: currentUserId,
        content: message,
      } as MessageRequestDto

      ws.send(JSON.stringify(data));

      onSend?.(message);
      setMessage('');

      try {
        await postMessage(data);
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={disabled || !isConnected}
        className="flex-1 px-3 py-2 rounded border"
      />
      <button
        type="submit"
        disabled={disabled || !message.trim() || !isConnected}
        className="px-4 py-2 rounded disabled:opacity-50"
      >
        Send
      </button>
    </form>
  );
};