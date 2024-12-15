export interface MessageInputProps {
  placeholder?: string;
  onSend?: (message: string) => void;
  attachments?: boolean;
  maxLength?: number;
  disabled?: boolean;
  userId: string;
}