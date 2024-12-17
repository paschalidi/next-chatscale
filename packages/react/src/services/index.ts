import { apiRequest } from "../lib/apiRequest";
import { ChannelsResponseDto, MessageRequestDto, MessageResponseDto, MessagesResponseDto } from "../types";


export const fetchChannels = async () => {
  return await apiRequest<ChannelsResponseDto>(
    '/api/channels',
    {
      method: "GET",
      headers: {
        Accept: 'application/json',
      }
    }
  );
}

export const createNewChannel = async ({ name }: { name: string }) => {
  return await apiRequest<ChannelsResponseDto>(
    '/api/channels',
    {
      method: "POST",
      headers: {
        Accept: 'application/json',
      },
      body: JSON.stringify({ name })
    },
  );
}

export const postMessage = async (message: MessageRequestDto) => {
  return await apiRequest<MessageResponseDto>(
    '/api/messages',
    {
      method: "POST",
      body: JSON.stringify(message)
    },
  );
}

export const fetchMessagesByChannelId = async ({ channelId }: { channelId: string }) => {
  return await apiRequest<MessagesResponseDto>(
    `/api/messages/${channelId}`,
    {
      method: "GET",
      headers: {
        Accept: 'application/json',
      },
    },
  );
}
