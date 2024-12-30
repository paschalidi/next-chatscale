import CodeBlock from "@/components/ui/code-block";
import Link from "next/link";

const mailto = `mailto:paschalidi@outlook.com?subject=${encodeURIComponent("ReChat Support Request")}`;

const codeExamples = {
  installation: `npm install @rechat-sdk/react`,

  quickStart: `import { ChatProvider, ChannelList, Messages, MessageInput } from '@rechat-sdk/react'

function App() {
  return (
    <ChatProvider 
      apiKey="your_api_key"
      appId="your_app_id"
      channelName="general"
      userId="user_123"
      userName="John Doe"
    >
      <div className="flex h-screen">
        <ChannelList />
        <div className="flex-1 flex flex-col">
          <Messages />
          <MessageInput />
        </div>
      </div>
    </ChatProvider>
  )
}`,

  chatProvider: `import { ChatProvider } from '@rechat-sdk/react'

<ChatProvider 
  apiKey="your_api_key"
  appId="your_app_id"
  channelName="general"
  userId="user_123"
  userName="John Doe"
  options={{
    reconnectInterval: 3000,
    maxReconnectAttempts: 5,
    debug: false
  }}
>
  {/* Your chat components */}
</ChatProvider>`,

  messages: `import { Messages } from '@rechat-sdk/react'

<Messages 
  className="flex-1 overflow-y-auto"
  containerClassName="p-4 space-y-4"
  messageClassName="max-w-[70%]"
  renderMessage={(message) => (
    <div className="message-custom">
      <p>{message.content}</p>
      <span>{message.participant_id}</span>
    </div>
  )}
/>`,

  channelList: `import { ChannelList } from '@rechat-sdk/react'

<ChannelList 
  limit={50}
  onChatSelect={(channel) => console.log('Selected:', channel)}
  customStyles={{
    container: 'border-r h-full w-64',
    chatItem: 'p-4 hover:bg-gray-100'
  }}
  renderItem={(channel) => (
    <div>
      <h3>{channel.name}</h3>
    </div>
  )}
/>`,

  messageInput: `import { MessageInput } from '@rechat-sdk/react'

<MessageInput 
  placeholder="Type a message..."
  onSend={(message) => console.log('Sent:', message)}
  maxLength={1000}
  disabled={false}
/>`,

  useChat: `import { useChat } from '@rechat-sdk/react'

function CustomChat() {
  const { 
    messages: { data: messages, isLoading, error, refetch },
    channels: { data: channels },
    currentUser: { id, userName, isConnected },
    activeChannel: { name, id: channelId },
    ws
  } = useChat()
  
  // Access real-time chat state and functionality
}`
};

export function DocsContent() {
  return (
    <div className="flex-1 max-w-3xl">
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h1>ReChat Documentation</h1>
        <p className="lead">
          Welcome to ReChat - Enterprise-grade chat infrastructure for modern React applications.
        </p>

        <h2 id="quick-start">Quick Start</h2>
        <p>Get up and running with ReChat in minutes:</p>
        <CodeBlock
          code={codeExamples.installation}
          language="bash"
          filename="Terminal"
          showLineNumbers={false}
        />

        <p>Add chat functionality to your React application with just a few lines of code:</p>
        <CodeBlock
          code={codeExamples.quickStart}
          filename="App.tsx"
        />

        <h2 id="chat-provider">ChatProvider</h2>
        <p>
          The ChatProvider component initializes the chat client and manages the WebSocket connection.
          It provides the chat context to all child components.
        </p>
        <CodeBlock
          code={codeExamples.chatProvider}
          filename="ChatProvider.tsx"
        />

        <div className="not-prose bg-muted p-4 rounded-lg my-6">
          <h4 className="mt-0 text-base font-medium">Required Props</h4>
          <ul className="mt-2 space-y-2 text-sm">
            <li><code>apiKey</code>: Your ReChat API key</li>
            <li><code>appId</code>: Your application ID</li>
            <li><code>channelName</code>: The name of the channel to connect to</li>
            <li><code>userId</code>: The current user&apos;s ID</li>
            <li><code>userName</code>: The current user&apos;s display name</li>
          </ul>
        </div>

        <h2 id="messages">Messages</h2>
        <p>
          The Messages component displays the message history and real-time messages for the current channel.
          It handles message rendering, auto-scrolling, and loading states.
        </p>
        <CodeBlock
          code={codeExamples.messages}
          filename="Messages.tsx"
        />

        <div className="not-prose bg-muted p-4 rounded-lg my-6">
          <h4 className="mt-0 text-base font-medium">Customization Props</h4>
          <ul className="mt-2 space-y-2 text-sm">
            <li><code>className</code>: CSS class for the outer container</li>
            <li><code>containerClassName</code>: CSS class for the messages wrapper</li>
            <li><code>messageClassName</code>: CSS class for individual messages</li>
            <li><code>renderMessage</code>: Custom message render function</li>
          </ul>
        </div>

        <h2 id="chat-list">ChannelList</h2>
        <p>The ChannelList component displays available channels and handles channel selection.</p>
        <CodeBlock
          code={codeExamples.channelList}
          filename="ChannelList.tsx"
        />

        <div className="not-prose bg-muted p-4 rounded-lg my-6">
          <h4 className="mt-0 text-base font-medium">Available Props</h4>
          <ul className="mt-2 space-y-2 text-sm">
            <li><code>limit</code>: Maximum number of channels to display</li>
            <li><code>onChatSelect</code>: Callback when a channel is selected</li>
            <li><code>customStyles</code>: Custom styling classes</li>
            <li><code>renderItem</code>: Custom channel render function</li>
          </ul>
        </div>

        <h2 id="message-input">MessageInput</h2>
        <p>Provides an input field for sending messages in the current channel.</p>
        <CodeBlock
          code={codeExamples.messageInput}
          filename="MessageInput.tsx"
        />

        <div className="not-prose bg-muted p-4 rounded-lg my-6">
          <h4 className="mt-0 text-base font-medium">Available Props</h4>
          <ul className="mt-2 space-y-2 text-sm">
            <li><code>placeholder</code>: Input placeholder text</li>
            <li><code>onSend</code>: Callback when a message is sent</li>
            <li><code>maxLength</code>: Maximum message length</li>
            <li><code>disabled</code>: Disable the input</li>
          </ul>
        </div>

        <h2 id="hooks">useChat Hook</h2>
        <p>
          The useChat hook provides access to the chat state and functionality. It returns
          messages, channels, user information, and WebSocket connection details.
        </p>
        <CodeBlock
          code={codeExamples.useChat}
          filename="CustomComponent.tsx"
        />

        <div className="not-prose bg-secondary/50 p-4 rounded-lg my-6">
          <h4 className="mt-0 text-base font-medium">Hook Return Values</h4>
          <ul className="mt-2 space-y-2 text-sm">
            <li><code>messages</code>: Message data and loading state</li>
            <li><code>channels</code>: Available channels and loading state</li>
            <li><code>currentUser</code>: Current user information</li>
            <li><code>activeChannel</code>: Currently active channel</li>
            <li><code>ws</code>: WebSocket instance for advanced usage</li>
          </ul>
        </div>

        <h2 id="typescript-types">TypeScript Support</h2>
        <p>ReChat includes built-in TypeScript definitions for all components and hooks:</p>

        <div className="not-prose bg-muted p-4 rounded-lg my-6">
          <h4 className="mt-0 text-base font-medium">Available Types</h4>
          <ul className="mt-2 space-y-2 text-sm">
            <li><code>ChatListProps</code>: Props for ChannelList component</li>
            <li><code>MessageInputProps</code>: Props for MessageInput component</li>
            <li><code>MessagesProps</code>: Props for Messages component</li>
            <li><code>ChannelResponseDto</code>: Channel data structure</li>
            <li><code>MessageResponseDto</code>: Message data structure</li>
          </ul>
        </div>

        <div className="my-12 p-6 border rounded-lg bg-primary/5">
          <h3 className="!mt-0">Need Help?</h3>
          <p className="mb-4">Our support team is here to help you build amazing chat experiences.</p>
          <div className="flex gap-4">
            <Link
              className="btn btn-primary"
              href={mailto}
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}