'use client'
import * as React from 'react';
import { ChatListProps } from './types';
import { useChat } from "../../context/ChatContext";

export const ChannelList: React.FC<ChatListProps> = ({
                                                    limit = 50,
                                                    onChatSelect,
                                                    customStyles = {},
                                                    renderItem
                                                  }) => {
  const { channels } = useChat();

  if (channels.isLoading) {
    return <div>Loading chats...</div>;
  }

  return (
    <div className={customStyles.container}>
      {channels.data?.map((channel) => (
        <div
          key={channel.id}
          onClick={() => onChatSelect?.(channel)}
          className={customStyles.chatItem}
        >
          {renderItem ? (
            renderItem(channel)
          ) : (
            <div>
              <h3>{channel.name}</h3>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};