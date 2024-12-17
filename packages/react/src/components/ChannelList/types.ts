import { ChannelResponseDto } from "../../types";
import { ReactNode } from "react";


export interface ChatListProps {
  limit?: number;
  onChatSelect?: (channel: ChannelResponseDto) => void;
  customStyles?: {
    container?: string;
    chatItem?: string;
  };
  renderItem?: (channel: ChannelResponseDto) => ReactNode;
}
