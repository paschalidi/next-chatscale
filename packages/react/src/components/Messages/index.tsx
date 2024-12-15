import * as React from 'react';
import { Message, MessagesProps } from './types';
import { useChat } from '../../context/ChatContext';

export const Messages: React.FC<MessagesProps> = ({
                                                    className = '',
                                                    containerClassName = '',
                                                    messageClassName = () => '',
                                                    renderMessage
                                                  }) => {
  const { messages } = useChat();
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
        className={messageClassName({ isCurrentUser: message.user_id === "" })}
      >
        <div className="flex justify-between items-start gap-2">
          <span className="font-medium">{message.user_id}</span>
          <span className="text-xs opacity-70">
          {new Date(message.timestamp * 1000).toLocaleTimeString()}
        </span>
        </div>
        <p className="mt-1">{message.content}</p>
      </div>
    )
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