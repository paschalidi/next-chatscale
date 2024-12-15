import * as React from "react";

export interface ChatProviderProps {
  children: React.ReactNode;
  organizationToken: string;
  channelName: string;
  options?: {
    reconnectInterval?: number;
    maxReconnectAttempts?: number;
    debug?: boolean;
  };
}
