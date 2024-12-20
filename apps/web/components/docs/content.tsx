import CodeBlock from "@/components/ui/code-block";
import Link from "next/link";

const mailto = `mailto:paschalidi@outlook.com?subject=${encodeURIComponent("ReChat Support Request")}&body=${encodeURIComponent(
  `Hello ReChat Support Team,

I need assistance with ReChat integration.

Technical Details:
- Package Version: 
- Browser: 
- Environment: 

Issue Description:
[Please describe your issue]

Steps to Reproduce:
1. 
2. 
3. 

Expected Behavior:


Current Behavior:


Thank you for your help!`
)}`
const codeExamples = {
  installation: `npm install @rechat/react`,

  quickStart: `import { ChatProvider, ChannelList, MessageInput } from '@rechat/react'

function App() {
  return (
    <ChatProvider organizationToken="your_token">
      <ChannelList />
      <MessageInput />
    </ChatProvider>
  )
}`,

  chatProvider: `import { ChatProvider } from '@rechat/react'

<ChatProvider 
  organizationToken="your_token"
  options={{
    reconnectInterval: 3000,
    maxReconnectAttempts: 5,
    debug: false
  }}
>
  {/* Your chat components */}
</ChatProvider>`,

  channelList: `import { ChannelList } from '@rechat/react'

<ChannelList 
  limit={50}
  onChatSelect={(chatId) => console.log('Selected chat:', chatId)}
  customStyles={{
    container: 'custom-container-class',
    chatItem: 'custom-item-class'
  }}
/>`,

  messageInput: `import { MessageInput } from '@rechat/react'

<MessageInput 
  placeholder="Type a message..."
  onSend={(message) => console.log('Sending:', message)}
  attachments={true}
  maxLength={1000}
/>`,

  customComponents: `<ChannelList
  renderItem={(chat) => (
    <div className="custom-chat-item">
      <h3>{chat.title}</h3>
      <p>{chat.lastMessage}</p>
    </div>
  )}
/>`,

  hooks: `import { useChatConnection, useMessages } from '@rechat/react'

function CustomChat() {
  const { status, connect, disconnect } = useChatConnection()
  const { messages, sendMessage } = useMessages(chatId)
  
  // Custom implementation
}`,

  presenceIndicator: `import { PresenceIndicator } from '@rechat/react'

<PresenceIndicator 
  userId="user123"
  onlineClassName="user-online"
  offlineClassName="user-offline"
/>`,

  typingIndicator: `import { TypingIndicator } from '@rechat/react'

<TypingIndicator chatId="chat123" />`,

  errorHandling: `<ChatProvider
  organizationToken="your_token"
  onError={(error) => {
    console.error('ReChat error:', error)
    // Custom error handling
  }}
>
  {/* Your chat components */}
</ChatProvider>`
};

export function DocsContent() {
  return (
    <div className="flex-1 max-w-3xl">
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h1>ReChat Documentation</h1>
        <p className="lead">
          Welcome to ReChat - Enterprise-grade chat infrastructure for modern applications.
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
          filename="App.jsx"
        />

        <h2 id="chat-provider">ChatProvider</h2>
        <p>
          The ChatProvider component initializes the ReChat client and manages the WebSocket connection.
          It must wrap all other ReChat components.
        </p>
        <CodeBlock
          code={codeExamples.chatProvider}
          filename="ChatProvider.jsx"
        />

        <h2 id="chat-list">ChannelList</h2>
        <p>Displays the list of active chats for the current user.</p>
        <CodeBlock
          code={codeExamples.channelList}
          filename="ChannelList.jsx"
        />

        <div className="not-prose bg-muted p-4 rounded-lg my-6">
          <h4 className="mt-0 text-base font-medium">Available Props</h4>
          <ul className="mt-2 space-y-2 text-sm">
            <li><code>limit</code>: Maximum number of chats to display (default: 50)</li>
            <li><code>onChatSelect</code>: Callback function when a chat is selected</li>
            <li><code>customStyles</code>: Object containing custom CSS classes</li>
          </ul>
        </div>

        <h2 id="message-input">MessageInput</h2>
        <p>Renders an input field for sending messages.</p>
        <CodeBlock
          code={codeExamples.messageInput}
          filename="MessageInput.jsx"
        />

        <h2 id="custom-components">Custom Components</h2>
        <p>ReChat components can be customized using render props:</p>
        <CodeBlock
          code={codeExamples.customComponents}
          filename="CustomComponent.jsx"
        />

        <h2 id="hooks">Hooks</h2>
        <p>ReChat provides custom hooks for advanced use cases:</p>
        <CodeBlock
          code={codeExamples.hooks}
          filename="CustomHooks.jsx"
        />

        <div className="not-prose bg-secondary/50 p-4 rounded-lg my-6">
          <h4 className="mt-0 text-base font-medium">Available Hooks</h4>
          <ul className="mt-2 space-y-2 text-sm">
            <li><code>useChatConnection</code>: Manage WebSocket connection</li>
            <li><code>useMessages</code>: Access and manage messages for a specific chat</li>
            <li><code>useChatList</code>: Access and manage the list of chats</li>
            <li><code>useTypingIndicator</code>: Handle typing indicators</li>
          </ul>
        </div>

        <h2 id="real-time-features">Real-time Features</h2>
        <h3>Presence Indicators</h3>
        <CodeBlock
          code={codeExamples.presenceIndicator}
          filename="PresenceIndicator.jsx"
        />

        <h3>Typing Indicators</h3>
        <CodeBlock
          code={codeExamples.typingIndicator}
          filename="TypingIndicator.jsx"
        />

        <h2 id="error-handling">Error Handling</h2>
        <p>ReChat provides built-in error handling and reconnection logic.</p>
        <CodeBlock
          code={codeExamples.errorHandling}
          filename="ErrorHandling.jsx"
        />

        <h2 id="rate-limits">Rate Limits</h2>
        <div className="not-prose bg-muted p-4 rounded-lg my-6">
          <h4 className="mt-0 text-base font-medium">Current Limits</h4>
          <ul className="mt-2 space-y-2 text-sm">
            <li>WebSocket connections: TDB per organization per day</li>
            <li>Messages: TDB per organization per day</li>
            <li>API requests: TDB per organization per day</li>
          </ul>
        </div>

        <div className="my-12 p-6 border rounded-lg bg-primary/5">
          <h3 className="mt-0">Need Help?</h3>
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