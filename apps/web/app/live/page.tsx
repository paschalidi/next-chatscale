"use client";

import { useState } from "react";
import { ChatList, ChatProvider, MessageInput, Messages } from "@chatscale/react";
import { DebugPanel } from "@/components/live/debug-panel";

export default function Live() {
  const [selectedChat, setSelectedChat] = useState<string | null>('tech_support');

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Live Chat Demo</h1>

        <div className="p-6 rounded-lg bg-card border">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Test Configuration</h2>
            <p className="text-muted-foreground">
              This is a live demo of the ChatScale components. Connect to a test channel and try it out.
            </p>
          </div>

          <ChatProvider
            organizationToken="test_token"
            wsEndpoint="ws://localhost:3001/ws/chat/tech_support"
            options={{ debug: true }}
          >
            <div className="grid grid-cols-12 gap-6 mt-6">
              {/* Sidebar with chat list */}
              <div className="col-span-4 border rounded-lg p-4">
                <h3 className="font-medium mb-4">Active Chats</h3>
                <ChatList
                  onChatSelect={setSelectedChat}
                  customStyles={{
                    container: 'space-y-2',
                    chatItem: 'p-3 rounded-lg hover:bg-accent cursor-pointer'
                  }}
                />
              </div>

              {/* Main chat area */}
              <div className="col-span-8 border rounded-lg p-4">
                <div className="flex flex-col h-[600px]">
                  {/* Chat header */}
                  <div className="border-b pb-4">
                    <h3 className="font-medium">
                      {selectedChat ? `Chat: ${selectedChat}` : 'Select a chat'}
                    </h3>
                  </div>

                  {/* Messages area */}
                  <div className="flex-1 overflow-y-auto py-4">
                    {selectedChat ? (
                      <div className="space-y-4">
                        <Messages
                          className="bg-white"
                          containerClassName="px-6"
                          messageClassName="shadow-sm"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full text-muted-foreground">
                        Select a chat to start messaging
                      </div>
                    )}
                  </div>

                  {/* Message input */}
                  <div className="border-t pt-4">
                    <MessageInput
                      placeholder="Type your message..."
                      onSend={(message) => console.log('Sending:', message)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <DebugPanel/>
          </ChatProvider>

        </div>
      </div>
    </div>
  );
}