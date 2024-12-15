import * as React$1 from 'react';

interface ChatProviderProps {
    children: React$1.ReactNode;
    organizationToken: string;
    wsEndpoint: string;
    options?: {
        reconnectInterval?: number;
        maxReconnectAttempts?: number;
        debug?: boolean;
    };
}

interface ChatContextType {
    organizationToken: string;
    wsEndpoint: string;
    isConnected: boolean;
    ws: WebSocket | null;
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

export { type Chat, ChatList, type ChatListProps, ChatProvider, type ChatProviderProps, MessageInput, type MessageInputProps, useChat };
