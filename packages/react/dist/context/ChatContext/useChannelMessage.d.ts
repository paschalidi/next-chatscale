import { MessagesResponseDto } from "../../types";
export declare function useChannelMessages(channelId?: string): {
    messages: MessagesResponseDto;
    areMessagesLoading: boolean;
    messagesError: Error | null;
    refetchMessages: () => Promise<void>;
};
