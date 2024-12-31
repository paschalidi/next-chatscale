"use client";

import { useEffect, useState } from "react";
import {
  ChannelList,
  ChannelResponseDto,
  ChatProvider,
  MessageInput,
  Messages,
  useCreateParticipant
} from "@rechat-sdk/react";
import { DebugPanel } from "@/components/live/debug-panel";
import { useRouter, useSearchParams } from "next/navigation";
import { clsx } from "clsx";
import { Modal } from "@/components/ui/modal";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { config } from "@/config";

function generateRandomUsername(): string {
  const animals = [
    'lion', 'wolf', 'eagle', 'fox', 'bear', 'tiger', 'owl', 'shark', 'dolphin',
    'panther', 'wolf', 'hawk', 'leopard', 'cheetah', 'cobra', 'raven', 'jaguar',
    'gorilla', 'elephant', 'rhino', 'koala', 'lynx', 'hyena', 'gazelle', 'serpent'
  ];

  const habitats = [
    'mountain', 'forest', 'ocean', 'desert', 'jungle', 'river', 'canyon', 'plains',
    'tundra', 'savanna', 'cave', 'island', 'reef', 'prairie', 'peak', 'valley',
    'glacier', 'swamp', 'meadow', 'wilderness'
  ];

  const titles = [
    'Wild', 'Silent', 'Swift', 'Brave', 'Gentle', 'Fierce', 'Noble', 'Ancient',
    'Wise', 'Lone', 'Free', 'Bold', 'Hidden', 'Mystic', 'Shadow', 'Light',
    'Storm', 'Calm', 'Spirit', 'Guardian'
  ];

  const animal = animals[Math.floor(Math.random() * animals.length)];
  const habitat = habitats[Math.floor(Math.random() * habitats.length)];
  const title = titles[Math.floor(Math.random() * titles.length)];

  return `${title} ${animal} of ${habitat}`;
}

export const PageView = () => {
  const searchParams = useSearchParams();
  const channelName = searchParams.get('cn') || '';
  const [selectedChat, setSelectedChat] = useState<ChannelResponseDto | null>({ id: 'unknown', name: channelName });
  const [userId, setUserId] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [isUsernameModalOpen, setIsUsernameModalOpen] = useState<boolean>(false); // Initialize as false
  const [isUserCreationLoading, setIsUserCreationLoading] = useState<boolean>(false);
  const closeModal = () => setIsUsernameModalOpen(false);
  const { createParticipant } = useCreateParticipant();

  const router = useRouter();

  useEffect(() => {
    // Check if user data already exists in localStorage
    let storedUserId = localStorage.getItem('chatUserId');
    let storedUserName = localStorage.getItem('chatUserName');

    if (!storedUserId || !storedUserName) {
      setIsUsernameModalOpen(true);
    } else {
      // Only set the states if we have values
      setUserId(storedUserId);
      setUserName(storedUserName);
    }
  }, []);

  const handleChannelSelection = (channel: ChannelResponseDto) => {
    setSelectedChat(channel);
    router.replace(`?cn=${channel.name}`, { scroll: false });
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Modal isOpen={isUsernameModalOpen} title="Choose a userName" onCloseRequest={closeModal}>
        <form
          className="space-y-4 pt-5"
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const userName = formData.get('userName') as string;

            if (userName) {
              try {
                setIsUserCreationLoading(true);
                const { data: { id, name } } = await createParticipant({
                  name: userName,
                  organizationId: config.rechat_app_id!
                });

                // Store in localStorage
                localStorage.setItem('chatUserName', userName);
                localStorage.setItem('chatUserId', id);
                // Update state
                setUserName(name);
                setUserId(id);
                closeModal();
              } catch (e) {
                console.error('Error creating user:', e);
                setIsUserCreationLoading(false);
              } finally {
                setIsUserCreationLoading(false);
              }
            }
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="userName">Username</Label>
            <Input
              id="userName"
              name="userName"
              placeholder="Enter your userName"
              defaultValue={generateRandomUsername()}
              required
            />
            <p className="text-sm text-muted-foreground">
              Choose a userName or use the randomly generated one.
            </p>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              disabled={isUserCreationLoading}
              onClick={async () => {
                try {
                  const randomUsername = generateRandomUsername();
                  setIsUserCreationLoading(true);
                  const { data: { id } } = await createParticipant({
                    name: randomUsername,
                    organizationId: config.rechat_app_id!
                  });
                  localStorage.setItem('chatUserName', randomUsername);
                  localStorage.setItem('chatUserId', id);
                  setUserName(randomUsername);
                  setUserId(id);
                } catch (e) {
                  console.error('Error creating user:', e);
                } finally {
                  setIsUserCreationLoading(false);
                  closeModal();
                }
              }}
            >
              Use Random
            </Button>
            <Button
              disabled={isUserCreationLoading}
              type="submit">
              Save Username
            </Button>
          </div>
        </form>
      </Modal>
      <div className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Live Chat Demo</h1>

        <div className="p-6 rounded-lg bg-card border">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Test Configuration</h2>
            <p className="text-muted-foreground">
              This is a live demo of the ReChat components. Connect to a test channel and try it out.
            </p>
            {userId && (
              <p className="text-sm text-muted-foreground mt-2">
                Your User ID: {userId}
              </p>
            )}
          </div>

          <ChatProvider
            userName={userName}
            userId={userId}
            channelName={channelName}
            appId={'47d7832e-268d-495d-903c-114459d8c771'}
            apiKey={'sk_92fe64b8-88e1-42da-9d91-21969c91c75c'}
            options={{ debug: true }}
          >
            <DebugPanel/>

            <div className="grid grid-cols-12 gap-6 mt-6">
              {/* Sidebar with chat list */}
              <div className="col-span-4 border rounded-lg p-4">
                <h3 className="font-medium mb-4">Channels</h3>
                <ChannelList
                  renderItem={(chat) => <div className={clsx({
                    'bg-accent': selectedChat?.name === chat.name,
                  }, 'rounded-lg hover:bg-neutral-100 cursor-pointer p-3')}># {chat.name}</div>}
                  onChatSelect={handleChannelSelection}
                  customStyles={{
                    container: 'space-y-2',
                  }}
                />
              </div>

              {/* Main chat area */}
              <div className="col-span-8 border rounded-lg p-4">
                <div className="flex flex-col h-[600px]">
                  {/* Chat header */}
                  <div className="border-b pb-4">
                    <h3 className="font-medium">
                      {selectedChat ? `Channel: ${selectedChat.name}` : 'Select a channel'}
                    </h3>
                  </div>

                  {/* Messages area */}
                  <div className="flex-1 overflow-y-auto py-4">
                    {selectedChat ? (
                      <div className="space-y-4">
                        <Messages
                          containerClassName="px-6"
                          messageClassName={clsx(
                            'rounded-xl shadow-sm bg-gray-100 w-fit px-4 py-2',
                          )}
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
          </ChatProvider>
        </div>
      </div>
    </div>
  );
}