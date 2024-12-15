import * as React from 'react';
import { Chat, ChatListProps } from './types';
import { useChat } from "../../context/ChatContext";

export const ChatList: React.FC<ChatListProps> = ({
                                                    limit = 50,
                                                    onChatSelect,
                                                    customStyles = {},
                                                    renderItem
                                                  }) => {
  const { organizationToken } = useChat();
  const [chats, setChats] = React.useState<Chat[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch(`/api/chats?limit=${limit}`, {
          headers: {
            'Authorization': `Bearer ${organizationToken}`
          }
        });
        const data = await response.json();
        setChats(data);
      } catch (error) {
        console.error('Error fetching chats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChats();
  }, [organizationToken, limit]);

  if (isLoading) {
    return <div>Loading chats...</div>;
  }

  return (
    <div className={customStyles.container}>
      {chats.map((chat) => (
        <div
          key={chat.id}
          onClick={() => onChatSelect?.(chat.id)}
          className={customStyles.chatItem}
        >
          {renderItem ? (
            renderItem(chat)
          ) : (
            <div>
              <h3>{chat.name}</h3>
              {chat.lastMessage && <p>{chat.lastMessage}</p>}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};