import * as React from 'react';
import { MessageInputProps } from './types';
import { useChat } from '../../context/ChatContext';

export const MessageInput: React.FC<MessageInputProps> = ({
                                                            placeholder = 'Type a message...',
                                                            onSend,
                                                            maxLength = 1000,
                                                            disabled = false,

                                                          }) => {
  const [message, setMessage] = React.useState('');
  const { ws, isConnected, channelName, currentUserId, currentUserName } = useChat();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && ws && isConnected) {
      ws.send(JSON.stringify({
        "user_id": currentUserId,
        "room_id": channelName,
        "content": message,
        "username": currentUserName,
        "timestamp": 0
      }));
      onSend?.(message);
      setMessage('');
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