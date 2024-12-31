export type ChannelResponseDto = {
  name: string;
  id: string;
}

export type ChannelsResponseDto = Array<ChannelResponseDto>

export type PartialMessageRequestDto = MessageResponseDto | MessageRequestDto
export type CombinedMessagesDto = MessageResponseDto[] | MessageRequestDto[]

export type MessageResponseDto = MessageRequestDto & {
  id: string;
  timestamp: number;
}
export type MessageRequestDto = {
  participant_id: string;
  channel_name: string;
  content: string;
}

export type MessagesResponseDto = Array<MessageResponseDto>

export type TParticipantsResponse = {
  id: string;
  name: string;
}