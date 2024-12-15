import * as React from 'react';
import { Message, MessagesProps } from './types';
import { useChat } from '../../context/ChatContext';
import { clsx } from "clsx";

export const Messages: React.FC<MessagesProps> = ({
                                                    className = '',
                                                    containerClassName = '',
                                                    messageClassName = '',
                                                    renderMessage
                                                  }) => {
  const { messages, currentUserId } = useChat();
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const defaultRenderMessage = (message: Message) => {
    return (
      <div
        key={message.timestamp}
        className={clsx(
          messageClassName,
          'flex flex-col max-w-[70%]',
          message.user_id === currentUserId
            ? 'ml-auto items-end'
            : 'items-start'
        )}
      >
      <span className="text-xs text-muted-foreground mb-1">
        {message.user_id === currentUserId
          ? ''
          : message.user_id}
      </span>
        <div
          className={clsx(
            'rounded-lg px-1 py-2 max-w-[90%]',
            message.user_id === currentUserId
              ? 'bg-blue-500 text-white self-end'
              : 'bg-neutral-200 text-neutral-800 self-start'
          )}
        >
          <p>{message.content}</p>
        </div>
      </div>)
  };

  return (
    <div className={`flex flex-col h-full ${className}`}>
      <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${containerClassName}`}>
        {messages.map((message, index) => (
          <div key={index} className="max-w-[70%]">
            {renderMessage ? renderMessage(message) : defaultRenderMessage(message)}
          </div>
        ))}
        <div ref={messagesEndRef}/>
      </div>
    </div>
  );
};