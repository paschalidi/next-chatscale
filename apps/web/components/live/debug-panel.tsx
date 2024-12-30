"use client";

import { useChat } from "@rechat-sdk/react";

export function DebugPanel() {
  const {
    currentUser: {
      isConnected,
      userName: currentUserName,
      id: currentUserId
    }
    , wsEndpoint,
  } = useChat();

  return (
    <div className="mt-8 p-4 border rounded-lg bg-muted/50">
      <h3 className="font-medium mb-2">Debug Information</h3>
      <pre className="text-sm">
        {JSON.stringify({
          userId: currentUserId,
          userName: currentUserName,
          connectionStatus: isConnected ? "Connected" : "Disconnected",
          endpoint: wsEndpoint,
        }, null, 2)}
      </pre>
    </div>
  );
}