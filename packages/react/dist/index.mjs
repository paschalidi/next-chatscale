// src/context/ChatContext/index.tsx
import * as React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// src/config.ts
var config = {
  rust_api_url: "https://api.chatscale.cloud/api",
  rust_ws_url: "wss://api.chatscale.cloud/ws"
};

// src/context/ChatContext/index.tsx
var ChatContext = React.createContext(null);
var ChatProvider = ({
  children,
  organizationToken,
  channelName,
  userId,
  userName,
  options = {
    reconnectInterval: 3e3,
    maxReconnectAttempts: 5,
    debug: false
  }
}) => {
  const wsEndpoint = useMemo(() => `${config.rust_ws_url}/chat/${channelName}`, [channelName]);
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef(null);
  const reconnectAttempts = useRef(0);
  const reconnectTimeout = useRef();
  const [messages, setMessages] = useState([]);
  const connect = useCallback(() => {
    if (ws.current) {
      ws.current.close();
      ws.current = null;
    }
    try {
      ws.current = new WebSocket(wsEndpoint);
      ws.current.onopen = () => {
        setIsConnected(true);
        reconnectAttempts.current = 0;
        if (options.debug) {
          console.log("Connected to WebSocket");
        }
      };
      ws.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (options.debug) {
          console.log("Received message:", data);
        }
        setMessages((prev) => [...prev, {
          id: crypto.randomUUID(),
          user_id: data.user_id,
          username: data.username,
          room_id: data.room_id,
          content: data.content,
          timestamp: Date.now()
        }]);
      };
      ws.current.onclose = () => {
        setIsConnected(false);
        if (reconnectAttempts.current < (options.maxReconnectAttempts || 5)) {
          reconnectTimeout.current = window.setTimeout(connect, options.reconnectInterval);
          reconnectAttempts.current += 1;
          if (options.debug)
            console.log(`Reconnect attempt ${reconnectAttempts.current}`);
        }
      };
      ws.current.onerror = (error) => {
        if (options.debug)
          console.error("WebSocket error:", error);
      };
    } catch (error) {
      if (options.debug)
        console.error("WebSocket connection error:", error);
    }
  }, [wsEndpoint, options]);
  useEffect(() => {
    connect();
    return () => {
      if (reconnectTimeout.current) {
        window.clearTimeout(reconnectTimeout.current);
      }
      if (ws.current) {
        ws.current.close();
        ws.current = null;
      }
    };
  }, [channelName, connect]);
  const value = useMemo(() => ({
    organizationToken,
    channelName,
    wsEndpoint,
    isConnected,
    messages,
    ws: ws.current,
    currentUserId: userId,
    currentUserName: userName
  }), [organizationToken, channelName, wsEndpoint, isConnected, messages, userId, userName]);
  return /* @__PURE__ */ React.createElement(ChatContext.Provider, { value }, children);
};
var useChat = () => {
  const context = React.useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};

// src/components/ChatList/index.tsx
import * as React2 from "react";
var ChatList = ({
  limit = 50,
  onChatSelect,
  customStyles = {},
  renderItem
}) => {
  const { organizationToken, channelName } = useChat();
  const [chats, setChats] = React2.useState([
    {
      id: "public",
      name: "public",
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    }
  ]);
  const [isLoading, setIsLoading] = React2.useState(true);
  React2.useEffect(() => {
    const fetchChats = async () => {
      try {
      } catch (error) {
        console.error("Error fetching chats:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchChats();
  }, [organizationToken, limit]);
  if (isLoading) {
    return /* @__PURE__ */ React2.createElement("div", null, "Loading chats...");
  }
  return /* @__PURE__ */ React2.createElement("div", { className: customStyles.container }, chats.map((chat) => /* @__PURE__ */ React2.createElement(
    "div",
    {
      key: chat.id,
      onClick: () => onChatSelect?.(chat.id),
      className: customStyles.chatItem
    },
    renderItem ? renderItem(chat) : /* @__PURE__ */ React2.createElement("div", null, /* @__PURE__ */ React2.createElement("h3", null, chat.name), chat.lastMessage && /* @__PURE__ */ React2.createElement("p", null, chat.lastMessage))
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
  const { ws, isConnected, channelName, currentUserId, currentUserName } = useChat();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && ws && isConnected) {
      ws.send(JSON.stringify({
        "user_id": currentUserId,
        "room_id": channelName,
        "content": message,
        "username": currentUserName,
        "timestamp": 0
      }));
      onSend?.(message);
      setMessage("");
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
  const { messages, currentUserId } = useChat();
  const messagesEndRef = React4.useRef(null);
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
        key: message.timestamp,
        className: clsx(
          messageClassName,
          "flex flex-col max-w-[70%]",
          message.user_id === currentUserId ? "ml-auto items-end" : "items-start"
        )
      },
      /* @__PURE__ */ React4.createElement("span", { className: "text-xs text-muted-foreground" }, message.user_id === currentUserId ? "" : message.username ?? "Some user"),
      /* @__PURE__ */ React4.createElement(
        "div",
        {
          className: clsx(
            "rounded-lg px-1 max-w-[90%]",
            message.user_id === currentUserId ? "bg-blue-500 text-white self-end" : "bg-neutral-200 text-neutral-800 self-start"
          )
        },
        /* @__PURE__ */ React4.createElement("p", null, message.content)
      )
    );
  };
  return /* @__PURE__ */ React4.createElement("div", { className: `flex flex-col h-full ${className}` }, /* @__PURE__ */ React4.createElement("div", { className: `flex-1 overflow-y-auto p-4 space-y-4 ${containerClassName}` }, messages.map((message, index) => /* @__PURE__ */ React4.createElement("div", { key: index, className: "max-w-[70%]" }, renderMessage ? renderMessage(message) : defaultRenderMessage(message))), /* @__PURE__ */ React4.createElement("div", { ref: messagesEndRef })));
};
export {
  ChatList,
  ChatProvider,
  MessageInput,
  Messages,
  useChat
};
//# sourceMappingURL=index.mjs.map