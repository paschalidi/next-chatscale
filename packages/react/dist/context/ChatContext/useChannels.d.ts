import { ChannelsResponseDto } from "../../types";
interface UseChannelsReturn {
    channels: ChannelsResponseDto | undefined;
    currentChannelId: string | undefined;
    isChannelsLoading: boolean;
    channelsError: Error | null;
    refetchChannels: () => Promise<void>;
}
export declare const useChannels: ({ channelName }: {
    channelName: string;
}) => UseChannelsReturn;
export {};
