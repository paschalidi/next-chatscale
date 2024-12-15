export interface Chat {
  id: string;
  name: string;
  lastMessage?: string;
  updatedAt: string;
}

export interface ChatListProps {
  limit?: number;
  onChatSelect?: (chatId: string) => void;
  customStyles?: {
    container?: string;
    chatItem?: string;
  };
  renderItem?: (chat: Chat) => React.ReactNode;
}
