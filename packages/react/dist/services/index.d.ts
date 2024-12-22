import { ChannelsResponseDto, MessageRequestDto, MessageResponseDto, MessagesResponseDto } from "../types";
export declare const fetchChannels: () => Promise<{
    data: ChannelsResponseDto;
    message: string;
}>;
export declare const createNewChannel: ({ name }: {
    name: string;
}) => Promise<{
    data: ChannelsResponseDto;
    message: string;
}>;
export declare const postMessage: (message: MessageRequestDto) => Promise<{
    data: MessageResponseDto;
    message: string;
}>;
export declare const fetchMessagesByChannelId: ({ channelId }: {
    channelId: string;
}) => Promise<{
    data: MessagesResponseDto;
    message: string;
}>;
