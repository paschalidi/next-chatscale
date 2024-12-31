import { apiRequest } from "../lib/apiRequest";
import {
  ChannelsResponseDto,
  MessageRequestDto,
  MessageResponseDto,
  MessagesResponseDto,
  TParticipantsResponse
} from "../types";


export const fetchChannels = async ({ organizationId, apiKey }: { organizationId: string; apiKey: string }) => {
  return await apiRequest<{ data: ChannelsResponseDto, message: string }>(
    `/api/organizations/${organizationId}/channels`,
    {
      method: "GET",
      headers: {
        "X-API-Key": apiKey,
        Accept: 'application/json',
      }
    }
  );
}

export const createNewChannel = async ({ organizationId, name }: { organizationId: string, name: string }) => {
  return await apiRequest<{ data: ChannelsResponseDto, message: string }>(
    `/api/organizations/${organizationId}/channels`,
    {
      method: "POST",
      headers: {
        Accept: 'application/json',
      },
      body: JSON.stringify({ name })
    },
  );
}

export const createParticipant = async ({ name, organizationId }: { name: string, organizationId: string }) => {
  return await apiRequest<{ data: TParticipantsResponse, message: string }>(
    `/api/organizations/${organizationId}/participants`,
    {
      method: "POST",
      body: JSON.stringify({ name })
    }
  );
}


export const postMessage = async ({ apiKey, organizationId, message }: {
  organizationId: string;
  apiKey: string;
  message: MessageRequestDto
}) => {
  return await apiRequest<{ data: MessageResponseDto, message: string }>(
    `/api/organizations/${organizationId}/messages`,
    {
      method: "POST",
      headers: {
        "X-API-Key": apiKey,
      },
      body: JSON.stringify(message)
    },
  );
}

export const fetchMessagesByChannelId = async ({ channelId, organizationId, apiKey }: {
  channelId: string;
  organizationId: string;
  apiKey: string
}) => {
  return await apiRequest<{ data: MessagesResponseDto, message: string }>(
    `/api/organizations/${organizationId}/messages/${channelId}`,
    {
      method: "GET",
      headers: {
        "X-API-Key": apiKey,
        Accept: 'application/json',
      },
    },
  );
}
