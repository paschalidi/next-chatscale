import * as React from 'react';
import { ChannelsResponseDto, CombinedMessagesDto } from "../../types";
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
export declare const ChatProvider: React.FC<ChatProviderProps>;
export declare const useChat: () => ChatContextType;
export {};
