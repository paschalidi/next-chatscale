import * as React$1 from 'react';

interface ChatProviderProps {
    children: React$1.ReactNode;
    organizationToken: string;
    channelName: string;
    options?: {
        reconnectInterval?: number;
        maxReconnectAttempts?: number;
        debug?: boolean;
    };
}

interface ChatContextType {
    organizationToken: string;
    channelName: string;
    isConnected: boolean;
    wsEndpoint: string;
    ws: WebSocket | null;
    messages: Message$1[];
}
interface Message$1 {
    id: string;
    user_id: string;
    room_id: string;
    content: string;
    timestamp: number;
}
declare const ChatProvider: React$1.FC<ChatProviderProps>;
declare const useChat: () => ChatContextType;

interface Chat {
    id: string;
    name: string;
    lastMessage?: string;
    updatedAt: string;
}
interface ChatListProps {
    limit?: number;
    onChatSelect?: (chatId: string) => void;
    customStyles?: {
        container?: string;
        chatItem?: string;
    };
    renderItem?: (chat: Chat) => React.ReactNode;
}

declare const ChatList: React$1.FC<ChatListProps>;

interface MessageInputProps {
    placeholder?: string;
    onSend?: (message: string) => void;
    attachments?: boolean;
    maxLength?: number;
    disabled?: boolean;
}

declare const MessageInput: React$1.FC<MessageInputProps>;

interface Message {
    user_id: string;
    room_id: string;
    content: string;
    timestamp: number;
}
interface MessagesProps {
    className?: string;
    containerClassName?: string;
    messageClassName?: ({ isCurrentUser }: {
        isCurrentUser: boolean;
    }) => string;
    renderMessage?: (message: Message) => React.ReactNode;
}

declare const Messages: React$1.FC<MessagesProps>;

export { type Chat, ChatList, type ChatListProps, ChatProvider, type ChatProviderProps, type Message, MessageInput, type MessageInputProps, Messages, type MessagesProps, useChat };
