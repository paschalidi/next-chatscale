import * as React from 'react';
import { useEffect } from 'react';
import { MessagesProps } from './types';
import { useChat } from '../../context/ChatContext';
import { clsx } from "clsx";
import { PartialMessageRequestDto } from "../../types";

export const Messages: React.FC<MessagesProps> = ({
                                                    className = '',
                                                    containerClassName = '',
                                                    messageClassName = '',
                                                    renderMessage
                                                  }) => {
  const {
    messages: { data: messages, refetch }, currentUser: {
      id: currentUserId
    },
  } = useChat();
  const messagesEndRef = React.useRef<HTMLDivElement>(null);


  useEffect(() => {
    refetch()
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);


  const defaultRenderMessage = (message: PartialMessageRequestDto) => {
    return (
      <div
        key={message.participant_id.toString() + message.content}
        className={clsx(
          messageClassName,
          'flex flex-col max-w-[70%]',
          message.participant_id === currentUserId
            ? 'ml-auto items-end'
            : 'items-start'
        )}
      >
      <span className="text-xs text-muted-foreground">
        {message.participant_id === currentUserId
          ? ''
          : message.participant_id ?? 'Some user'}
      </span>
        <div
          className={clsx(
            'rounded-lg px-1 max-w-[90%]',
            message.participant_id === currentUserId
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
        {messages?.map((message, index) => (
          <div key={index} className="max-w-[70%]">
            {renderMessage ? renderMessage(message) : defaultRenderMessage(message)}
          </div>
        ))}
        <div ref={messagesEndRef}/>
      </div>
    </div>
  );
};