import * as React from "react";

export interface ChatProviderProps {
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
