export interface Message {
  user_id: string;
  room_id: string;
  content: string;
  timestamp: number;
}

export interface MessagesProps {
  className?: string;
  containerClassName?: string;
  messageClassName?: ({ isCurrentUser }: { isCurrentUser: boolean }) => string;
  renderMessage?: (message: Message) => React.ReactNode;
}