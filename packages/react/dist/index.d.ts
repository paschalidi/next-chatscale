import * as React from 'react';
import { ReactNode } from 'react';

type ChannelResponseDto = {
    name: string;
    id: string;
};
type ChannelsResponseDto = Array<ChannelResponseDto>;
type CombinedMessagesDto = MessageResponseDto[] | MessageRequestDto[];
type MessageResponseDto = MessageRequestDto & {
    id: string;
    timestamp: number;
};
type MessageRequestDto = {
    participant_id: string;
    channel_name: string;
    content: string;
};
type MessagesResponseDto = Array<MessageResponseDto>;

interface Resource<T> {
    data: T | undefined;
    isLoading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
}
interface ChatContextType {
    organizationToken: string;
    activeChannel: {
        name: string;
        id: string | undefined;
    };
    currentUser: {
        id: string;
        userName: string;
        isConnected: boolean;
    };
    wsEndpoint: string;
    ws: WebSocket | null;
    messages: Resource<CombinedMessagesDto>;
    channels: Resource<ChannelsResponseDto>;
}
interface ChatProviderProps {
    children: React.ReactNode;
    organizationToken: string;
    channelName: string;
    userId: string;
    userName?: string;
    options?: {
        reconnectInterval?: number;
        maxReconnectAttempts?: number;
        debug?: boolean;
    };
}
declare const ChatProvider: React.FC<ChatProviderProps>;
declare const useChat: () => ChatContextType;

interface ChatListProps {
    limit?: number;
    onChatSelect?: (channel: ChannelResponseDto) => void;
    customStyles?: {
        container?: string;
        chatItem?: string;
    };
    renderItem?: (channel: ChannelResponseDto) => ReactNode;
}

declare const ChannelList: React.FC<ChatListProps>;

interface MessageInputProps {
    placeholder?: string;
    onSend?: (message: string) => void;
    attachments?: boolean;
    maxLength?: number;
    disabled?: boolean;
}

declare const MessageInput: React.FC<MessageInputProps>;

interface MessagesProps {
    className?: string;
    containerClassName?: string;
    messageClassName?: string;
    renderMessage?: (message: MessageRequestDto) => ReactNode;
}

declare const Messages: React.FC<MessagesProps>;

export { ChannelList, type ChannelResponseDto, type ChannelsResponseDto, type ChatListProps, ChatProvider, MessageInput, type MessageInputProps, type MessageResponseDto, Messages, type MessagesProps, type MessagesResponseDto, useChat };
