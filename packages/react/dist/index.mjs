// src/context/ChatContext/index.tsx
import * as React from "react";
import { useMemo } from "react";

// src/context/ChatContext/useChannels.ts
import { useEffect, useState } from "react";

// src/lib/logError.ts
var logError = (error, additionalContext = {}) => {
  let message;
  let stack;
  if (error instanceof Error) {
    message = error.message;
    stack = error.stack;
  } else {
    message = String(error);
    stack = void 0;
  }
  const errorLog = {
    message,
    stack,
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    ...additionalContext
  };
  console.error(errorLog);
};

// src/config.ts
var config = {
  rust_api_url: "https://api.chatscale.cloud",
  rust_ws_url: "wss://api.chatscale.cloud/ws"
};

// src/lib/apiRequest.ts
async function apiRequest(path, fetchOptions = {}, serverOptions = {}) {
  const defaultHeaders = {
    "Content-Type": "application/json"
  };
  const { serverUrl = config.rust_api_url } = serverOptions;
  const url = `${serverUrl}${path}`;
  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers: {
        ...defaultHeaders,
        ...fetchOptions.headers
      }
    });
    const contentType = response.headers.get("content-type");
    if (!response.ok) {
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(
          `${url} <- Error ${response.status}: Invalid content-type. Expected application/json, got ${JSON.stringify(response.body)}`
        );
      }
      const errorData = await response.json();
      throw new Error(
        `${url} <- Error ${response.status}: ${JSON.stringify(
          errorData,
          null,
          2
        )} `
      );
    }
    if (response.status === 204) {
      return { status: "204" };
    }
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      logErrorMetadata(error, url);
    } else {
      logError(error, { context: "Unexpected Error", url });
    }
    throw error;
  }
}
var logErrorMetadata = (error, url) => {
  if (error.name === "AbortError") {
    logError(`Timeout \u2013 ${error.name} ${error}`, {
      context: "Timeout Error",
      url
    });
  } else {
    logError(`${error.name} ${error}`, { context: "Fetch Error", url });
  }
};

// src/services/index.ts
var fetchChannels = async () => {
  return await apiRequest(
    "/api/channels",
    {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    }
  );
};
var postMessage = async (message) => {
  return await apiRequest(
    "/api/messages",
    {
      method: "POST",
      body: JSON.stringify(message)
    }
  );
};
var fetchMessagesByChannelId = async ({ channelId }) => {
  return await apiRequest(
    `/api/messages/${channelId}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    }
  );
};

// src/context/ChatContext/useChannels.ts
var useChannels = ({ channelName }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchChannels();
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch channels"));
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return {
    currentChannelId: data?.find((channel) => channelName === channel.name)?.id,
    channels: data,
    isChannelsLoading: isLoading,
    channelsError: error,
    refetchChannels: fetchData
  };
};

// src/context/ChatContext/useWebsocket.ts
import { useCallback, useEffect as useEffect2, useRef, useState as useState2 } from "react";
function useWebSocket(channelName, options = {}) {
  const [isConnected, setIsConnected] = useState2(false);
  const [messages, setMessages] = useState2([]);
  const ws = useRef(null);
  const reconnectAttempts = useRef(0);
  const reconnectTimeout = useRef();
  const connect = useCallback(() => {
    if (ws.current) {
      ws.current.close();
      ws.current = null;
    }
    try {
      ws.current = new WebSocket(`${config.rust_ws_url}/chat/${channelName}`);
      ws.current.onopen = () => {
        setIsConnected(true);
        reconnectAttempts.current = 0;
        if (options.debug) {
          console.log("Connected to WebSocket!");
        }
      };
      ws.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (options.debug) {
          console.log("Received message:", data);
        }
        setMessages((prev) => [...prev, {
          participant_id: data.participant_id,
          channel_name: data.channel_name,
          content: data.content
        }]);
      };
      ws.current.onclose = () => {
        setIsConnected(false);
        if (reconnectAttempts.current < (options.maxReconnectAttempts || 5)) {
          reconnectTimeout.current = window.setTimeout(connect, options.reconnectInterval);
          reconnectAttempts.current += 1;
        }
      };
      ws.current.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
    } catch (error) {
      if (options.debug)
        console.error("WebSocket error:", error);
    }
  }, [channelName, options]);
  useEffect2(() => {
    connect();
    return () => {
      if (reconnectTimeout.current) {
        window.clearTimeout(reconnectTimeout.current);
      }
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [channelName, connect]);
  return { isConnected, messages, ws: ws.current };
}

// src/context/ChatContext/useChannelMessage.ts
import { useCallback as useCallback2, useEffect as useEffect3, useState as useState3 } from "react";
function useChannelMessages(channelId) {
  const [messages, setMessages] = useState3([]);
  const [isLoading, setIsLoading] = useState3(false);
  const [error, setError] = useState3(null);
  const fetchMessages = useCallback2(async () => {
    if (!channelId)
      return;
    setIsLoading(true);
    try {
      const data = await fetchMessagesByChannelId({ channelId });
      setMessages(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch messages"));
    } finally {
      setIsLoading(false);
    }
  }, [channelId]);
  useEffect3(() => {
    fetchMessages();
  }, [channelId, fetchMessages]);
  return { messages, areMessagesLoading: isLoading, messagesError: error, refetchMessages: fetchMessages };
}

// src/context/ChatContext/index.tsx
var ChatContext = React.createContext(null);
var ChatProvider = ({
  children,
  organizationToken,
  channelName,
  userId,
  userName = "Unknown user",
  options = {
    reconnectInterval: 3e3,
    maxReconnectAttempts: 5,
    debug: false
  }
}) => {
  const { isConnected, messages: wsMessages, ws } = useWebSocket(channelName, options);
  const {
    channels,
    isChannelsLoading,
    channelsError,
    refetchChannels,
    currentChannelId
  } = useChannels({ channelName });
  const {
    messages: channelMessages,
    areMessagesLoading,
    refetchMessages,
    messagesError
  } = useChannelMessages(currentChannelId);
  const value = useMemo(() => ({
    organizationToken,
    currentUser: {
      id: userId,
      userName,
      isConnected
    },
    activeChannel: {
      name: channelName,
      id: currentChannelId
    },
    channels: {
      data: channels,
      isLoading: isChannelsLoading,
      error: channelsError,
      refetch: refetchChannels
    },
    messages: {
      data: [...channelMessages || [], ...wsMessages || []],
      isLoading: areMessagesLoading,
      error: messagesError,
      refetch: refetchMessages
    },
    wsEndpoint: `${config.rust_ws_url}/chat/${channelName}`,
    ws
  }), [
    organizationToken,
    channelName,
    currentChannelId,
    isConnected,
    channelMessages,
    wsMessages,
    areMessagesLoading,
    messagesError,
    refetchMessages,
    ws,
    userId,
    userName,
    channels,
    isChannelsLoading,
    channelsError,
    refetchChannels
  ]);
  return /* @__PURE__ */ React.createElement(ChatContext.Provider, { value }, children);
};
var useChat = () => {
  const context = React.useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};

// src/components/ChannelList/index.tsx
import * as React2 from "react";
var ChannelList = ({
  limit = 50,
  onChatSelect,
  customStyles = {},
  renderItem
}) => {
  const { channels } = useChat();
  if (channels.isLoading) {
    return /* @__PURE__ */ React2.createElement("div", null, "Loading chats...");
  }
  return /* @__PURE__ */ React2.createElement("div", { className: customStyles.container }, channels.data?.map((channel) => /* @__PURE__ */ React2.createElement(
    "div",
    {
      key: channel.id,
      onClick: () => onChatSelect?.(channel),
      className: customStyles.chatItem
    },
    renderItem ? renderItem(channel) : /* @__PURE__ */ React2.createElement("div", null, /* @__PURE__ */ React2.createElement("h3", null, channel.name))
  )));
};

// src/components/MessageInput/index.tsx
import * as React3 from "react";
var MessageInput = ({
  placeholder = "Type a message...",
  onSend,
  maxLength = 1e3,
  disabled = false
}) => {
  const [message, setMessage] = React3.useState("");
  const {
    ws,
    currentUser: {
      id: currentUserId,
      userName: currentUserName,
      isConnected
    },
    activeChannel: {
      id: channelId,
      name: channelName
    }
  } = useChat();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim() && ws && isConnected) {
      const data = {
        channel_name: channelName,
        participant_id: currentUserId,
        content: message
      };
      ws.send(JSON.stringify(data));
      onSend?.(message);
      setMessage("");
      try {
        await postMessage(data);
      } catch (e2) {
        console.error(e2);
      }
    }
  };
  return /* @__PURE__ */ React3.createElement("form", { onSubmit: handleSubmit, className: "flex gap-2" }, /* @__PURE__ */ React3.createElement(
    "input",
    {
      type: "text",
      value: message,
      onChange: (e) => setMessage(e.target.value),
      placeholder,
      maxLength,
      disabled: disabled || !isConnected,
      className: "flex-1 px-3 py-2 rounded border"
    }
  ), /* @__PURE__ */ React3.createElement(
    "button",
    {
      type: "submit",
      disabled: disabled || !message.trim() || !isConnected,
      className: "px-4 py-2 rounded disabled:opacity-50"
    },
    "Send"
  ));
};

// src/components/Messages/index.tsx
import * as React4 from "react";
import { useEffect as useEffect5 } from "react";

// ../../node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs
function r(e) {
  var t, f, n = "";
  if ("string" == typeof e || "number" == typeof e)
    n += e;
  else if ("object" == typeof e)
    if (Array.isArray(e)) {
      var o = e.length;
      for (t = 0; t < o; t++)
        e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
    } else
      for (f in e)
        e[f] && (n && (n += " "), n += f);
  return n;
}
function clsx() {
  for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++)
    (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
  return n;
}

// src/components/Messages/index.tsx
var Messages = ({
  className = "",
  containerClassName = "",
  messageClassName = "",
  renderMessage
}) => {
  const {
    messages: { data: messages, refetch },
    currentUser: {
      id: currentUserId
    }
  } = useChat();
  const messagesEndRef = React4.useRef(null);
  useEffect5(() => {
    refetch();
  }, []);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  React4.useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const defaultRenderMessage = (message) => {
    return /* @__PURE__ */ React4.createElement(
      "div",
      {
        key: message.participant_id.toString() + message.content,
        className: clsx(
          messageClassName,
          "flex flex-col max-w-[70%]",
          message.participant_id === currentUserId ? "ml-auto items-end" : "items-start"
        )
      },
      /* @__PURE__ */ React4.createElement("span", { className: "text-xs text-muted-foreground" }, message.participant_id === currentUserId ? "" : message.participant_id ?? "Some user"),
      /* @__PURE__ */ React4.createElement(
        "div",
        {
          className: clsx(
            "rounded-lg px-1 max-w-[90%]",
            message.participant_id === currentUserId ? "bg-blue-500 text-white self-end" : "bg-neutral-200 text-neutral-800 self-start"
          )
        },
        /* @__PURE__ */ React4.createElement("p", null, message.content)
      )
    );
  };
  return /* @__PURE__ */ React4.createElement("div", { className: `flex flex-col h-full ${className}` }, /* @__PURE__ */ React4.createElement("div", { className: `flex-1 overflow-y-auto p-4 space-y-4 ${containerClassName}` }, messages?.map((message, index) => /* @__PURE__ */ React4.createElement("div", { key: index, className: "max-w-[70%]" }, renderMessage ? renderMessage(message) : defaultRenderMessage(message))), /* @__PURE__ */ React4.createElement("div", { ref: messagesEndRef })));
};
export {
  ChannelList,
  ChatProvider,
  MessageInput,
  Messages,
  useChat
};
//# sourceMappingURL=index.mjs.map