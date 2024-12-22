import { MessageRequestDto } from "../../types";
export declare function useWebSocket(channelName: string): {
    isConnected: boolean;
    messages: MessageRequestDto[];
    ws: WebSocket | null;
};
