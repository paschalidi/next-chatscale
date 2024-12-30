# ReChat SDK Documentation

Welcome to ReChat SDK - A powerful React library for building real-time chat experiences.

## Installation

```bash
npm install @rechat-sdk/react
```

## Quick Start

```tsx
import { ChatProvider, ChannelList, MessageInput, Messages } from '@rechat-sdk/react'

function App() {
  return (
    <ChatProvider 
      apiKey="your_api_key"
      appId="your_app_id"
      channelName="general"
      userId="user_123"
      userName="John Doe"
    >
      <ChannelList />
      <Messages />
      <MessageInput />
    </ChatProvider>
  )
}
```

## Core Components

### ChatProvider

The ChatProvider component initializes the ReChat client and manages the WebSocket connection. It must wrap all other ReChat components.

```tsx
import { ChatProvider } from '@rechat-sdk/react'

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
</ChatProvider>
```

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| apiKey | string | Yes | Your ReChat API key |
| appId | string | Yes | Your application ID |
| channelName | string | Yes | The name of the channel to connect to |
| userId | string | Yes | The unique identifier for the current user |
| userName | string | No | The display name for the current user (defaults to "Unknown user") |
| options | object | No | Additional configuration options |

### ChannelList

Displays a list of available channels for the current user.

```tsx
import { ChannelList } from '@rechat-sdk/react'

<ChannelList 
  limit={50}
  onChatSelect={(channel) => console.log('Selected channel:', channel)}
  customStyles={{
    container: 'custom-container-class',
    chatItem: 'custom-item-class'
  }}
  renderItem={(channel) => (
    <div>
      <h3>{channel.name}</h3>
    </div>
  )}
/>
```

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| limit | number | No | Maximum number of channels to display (default: 50) |
| onChatSelect | (channel) => void | No | Callback when a channel is selected |
| customStyles | object | No | Custom CSS classes for styling |
| renderItem | (channel) => ReactNode | No | Custom render function for channel items |

### Messages

Displays the message history and real-time messages for the current channel.

```tsx
import { Messages } from '@rechat-sdk/react'

<Messages 
  className="messages-container"
  containerClassName="messages-wrapper"
  messageClassName="message-item"
  renderMessage={(message) => (
    <div>
      <p>{message.content}</p>
    </div>
  )}
/>
```

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| className | string | No | CSS class for the outer container |
| containerClassName | string | No | CSS class for the messages wrapper |
| messageClassName | string | No | CSS class for individual messages |
| renderMessage | (message) => ReactNode | No | Custom render function for messages |

### MessageInput

Provides an input field for sending messages in the current channel.

```tsx
import { MessageInput } from '@rechat-sdk/react'

<MessageInput 
  placeholder="Type a message..."
  onSend={(message) => console.log('Sending:', message)}
  maxLength={1000}
  disabled={false}
/>
```

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| placeholder | string | No | Input placeholder text (default: "Type a message...") |
| onSend | (message: string) => void | No | Callback when a message is sent |
| maxLength | number | No | Maximum message length (default: 1000) |
| disabled | boolean | No | Disables the input (default: false) |

## Hooks

### useChat

The main hook for accessing chat context and functionality.

```tsx
import { useChat } from '@rechat-sdk/react'

function CustomComponent() {
  const { 
    channels,
    messages,
    currentUser,
    activeChannel,
    ws
  } = useChat()

  // Access chat data and functionality
}
```

#### Return Values

| Value | Type | Description |
|-------|------|-------------|
| channels | { data, isLoading, error, refetch } | Channel list and status |
| messages | { data, isLoading, error, refetch } | Messages for current channel |
| currentUser | { id, userName, isConnected } | Current user information |
| activeChannel | { name, id } | Currently active channel |
| ws | WebSocket | WebSocket instance |

## Types

The library exports several TypeScript types for use in your application:

```typescript
export type {
  ChatListProps,
  MessageInputProps,
  MessagesProps,
  ChannelResponseDto,
  ChannelsResponseDto,
  MessageResponseDto,
  MessagesResponseDto
}
```

## WebSocket Events

The WebSocket connection automatically handles:
- Real-time message delivery
- Connection status
- Channel presence
- Error handling and reconnection

## Error Handling

The library includes built-in error handling and will automatically:
- Attempt to reconnect on connection loss
- Provide error states through the hooks
- Queue messages when offline

## Rate Limits

Please refer to our API documentation for current rate limits on:
- WebSocket connections
- Message sending
- API requests

## Support

For issues, feature requests, or questions, please:
1. Check our [GitHub repository](https://github.com/yourusername/rechat-sdk)
2. Open an issue
3. Contact support at support@rechat-sdk.com

## License

ISC License