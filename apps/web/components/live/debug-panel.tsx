"use client";

import { useChat } from "@chatscale/react";

export function DebugPanel() {
  const { isConnected, wsEndpoint } = useChat();

  return (
    <div className="mt-8 p-4 border rounded-lg bg-muted/50">
      <h3 className="font-medium mb-2">Debug Information</h3>
      <pre className="text-sm">
        {JSON.stringify({
          connectionStatus: isConnected ? "Connected" : "Disconnected",
          endpoint: wsEndpoint,
        }, null, 2)}
      </pre>
    </div>
  );
}