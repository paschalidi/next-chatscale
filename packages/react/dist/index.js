"use strict";
function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array(arr);
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _iterable_to_array_limit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _non_iterable_rest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _sliced_to_array(arr, i) {
    return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array(arr, i) || _non_iterable_rest();
}
function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_spread();
}
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
function _ts_generator(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = function(target, all) {
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = function(to, from, except, desc) {
    if (from && (typeof from === "undefined" ? "undefined" : _type_of(from)) === "object" || typeof from === "function") {
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            var _loop = function() {
                var key = _step.value;
                if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
                    get: function() {
                        return from[key];
                    },
                    enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
                });
            };
            for(var _iterator = __getOwnPropNames(from)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true)_loop();
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }
    return to;
};
var __toESM = function(mod, isNodeMode, target) {
    return target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(// If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
        value: mod,
        enumerable: true
    }) : target, mod);
};
var __toCommonJS = function(mod) {
    return __copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
};
// src/index.ts
var src_exports = {};
__export(src_exports, {
    ChatList: function() {
        return ChatList;
    },
    ChatProvider: function() {
        return ChatProvider;
    },
    MessageInput: function() {
        return MessageInput;
    },
    Messages: function() {
        return Messages;
    },
    useChat: function() {
        return useChat;
    }
});
module.exports = __toCommonJS(src_exports);
// src/context/ChatContext/index.tsx
var React = __toESM(require("react"));
var import_react = require("react");
// src/config.ts
var config = {
    rust_api_url: "https://api.chatscale.cloud/api",
    rust_ws_url: "wss://api.chatscale.cloud/ws"
};
// src/context/ChatContext/index.tsx
var ChatContext = React.createContext(null);
var ChatProvider = function(param) {
    var children = param.children, organizationToken = param.organizationToken, channelName = param.channelName, userId = param.userId, userName = param.userName, _param_options = param.options, options = _param_options === void 0 ? {
        reconnectInterval: 3e3,
        maxReconnectAttempts: 5,
        debug: false
    } : _param_options;
    var wsEndpoint = (0, import_react.useMemo)(function() {
        return "".concat(config.rust_ws_url, "/chat/").concat(channelName);
    }, [
        channelName
    ]);
    var _React_useState = _sliced_to_array(React.useState(false), 2), isConnected = _React_useState[0], setIsConnected = _React_useState[1];
    var ws = React.useRef(null);
    var reconnectAttempts = React.useRef(0);
    var reconnectTimeout = React.useRef();
    var _React_useState1 = _sliced_to_array(React.useState([]), 2), messages = _React_useState1[0], setMessages = _React_useState1[1];
    console.log(wsEndpoint);
    var connect = React.useCallback(function() {
        try {
            ws.current = new WebSocket(wsEndpoint);
            ws.current.onopen = function() {
                setIsConnected(true);
                reconnectAttempts.current = 0;
                if (options.debug) {
                    console.log("Connected to WebSocket");
                }
            };
            ws.current.onmessage = function(event) {
                var data = JSON.parse(event.data);
                if (options.debug) {
                    console.log("Received message:", data);
                }
                setMessages(function(prev) {
                    return _to_consumable_array(prev).concat([
                        {
                            id: crypto.randomUUID(),
                            user_id: data.user_id,
                            username: data.username,
                            room_id: data.room_id,
                            content: data.content,
                            timestamp: Date.now()
                        }
                    ]);
                });
            };
            ws.current.onclose = function() {
                setIsConnected(false);
                if (reconnectAttempts.current < (options.maxReconnectAttempts || 5)) {
                    reconnectTimeout.current = window.setTimeout(connect, options.reconnectInterval);
                    reconnectAttempts.current += 1;
                    if (options.debug) console.log("Reconnect attempt ".concat(reconnectAttempts.current));
                }
            };
            ws.current.onerror = function(error) {
                if (options.debug) console.error("WebSocket error:", error);
            };
        } catch (error) {
            if (options.debug) console.error("WebSocket connection error:", error);
        }
    }, [
        wsEndpoint
    ]);
    console.log("messages", channelName);
    React.useEffect(function() {
        connect();
        return function() {
            if (reconnectTimeout.current) {
                window.clearTimeout(reconnectTimeout.current);
            }
            if (ws.current) {
                ws.current.close();
                ws.current = null;
            }
        };
    }, []);
    var value = React.useMemo(function() {
        return {
            organizationToken: organizationToken,
            channelName: channelName,
            wsEndpoint: wsEndpoint,
            isConnected: isConnected,
            messages: messages,
            ws: ws.current,
            currentUserId: userId,
            currentUserName: userName
        };
    }, [
        organizationToken,
        wsEndpoint,
        isConnected,
        messages
    ]);
    return /* @__PURE__ */ React.createElement(ChatContext.Provider, {
        value: value
    }, children);
};
var useChat = function() {
    var context = React.useContext(ChatContext);
    if (!context) {
        throw new Error("useChat must be used within a ChatProvider");
    }
    return context;
};
// src/components/ChatList/index.tsx
var React2 = __toESM(require("react"));
var ChatList = function(param) {
    var _param_limit = param.limit, limit = _param_limit === void 0 ? 50 : _param_limit, onChatSelect = param.onChatSelect, _param_customStyles = param.customStyles, customStyles = _param_customStyles === void 0 ? {} : _param_customStyles, renderItem = param.renderItem;
    var _useChat = useChat(), organizationToken = _useChat.organizationToken, channelName = _useChat.channelName;
    var _React2_useState = _sliced_to_array(React2.useState([
        {
            id: "public",
            name: "public",
            updatedAt: /* @__PURE__ */ new Date().toISOString()
        }
    ]), 2), chats = _React2_useState[0], setChats = _React2_useState[1];
    var _React2_useState1 = _sliced_to_array(React2.useState(true), 2), isLoading = _React2_useState1[0], setIsLoading = _React2_useState1[1];
    React2.useEffect(function() {
        var fetchChats = /*#__PURE__*/ function() {
            var _ref = _async_to_generator(function() {
                return _ts_generator(this, function(_state) {
                    try {} catch (error) {
                        console.error("Error fetching chats:", error);
                    } finally{
                        setIsLoading(false);
                    }
                    return [
                        2
                    ];
                });
            });
            return function fetchChats() {
                return _ref.apply(this, arguments);
            };
        }();
        fetchChats();
    }, [
        organizationToken,
        limit
    ]);
    if (isLoading) {
        return /* @__PURE__ */ React2.createElement("div", null, "Loading chats...");
    }
    return /* @__PURE__ */ React2.createElement("div", {
        className: customStyles.container
    }, chats.map(function(chat) {
        return /* @__PURE__ */ React2.createElement("div", {
            key: chat.id,
            onClick: function() {
                return onChatSelect === null || onChatSelect === void 0 ? void 0 : onChatSelect(chat.id);
            },
            className: customStyles.chatItem
        }, renderItem ? renderItem(chat) : /* @__PURE__ */ React2.createElement("div", null, /* @__PURE__ */ React2.createElement("h3", null, chat.name), chat.lastMessage && /* @__PURE__ */ React2.createElement("p", null, chat.lastMessage)));
    }));
};
// src/components/MessageInput/index.tsx
var React3 = __toESM(require("react"));
var MessageInput = function(param) {
    var _param_placeholder = param.placeholder, placeholder = _param_placeholder === void 0 ? "Type a message..." : _param_placeholder, onSend = param.onSend, _param_maxLength = param.maxLength, maxLength = _param_maxLength === void 0 ? 1e3 : _param_maxLength, _param_disabled = param.disabled, disabled = _param_disabled === void 0 ? false : _param_disabled;
    var _React3_useState = _sliced_to_array(React3.useState(""), 2), message = _React3_useState[0], setMessage = _React3_useState[1];
    var _useChat = useChat(), ws = _useChat.ws, isConnected = _useChat.isConnected, channelName = _useChat.channelName, currentUserId = _useChat.currentUserId, currentUserName = _useChat.currentUserName;
    var handleSubmit = function(e) {
        e.preventDefault();
        if (message.trim() && ws && isConnected) {
            ws.send(JSON.stringify({
                "user_id": currentUserId,
                "room_id": channelName,
                "content": message,
                "username": currentUserName,
                "timestamp": 0
            }));
            onSend === null || onSend === void 0 ? void 0 : onSend(message);
            setMessage("");
        }
    };
    return /* @__PURE__ */ React3.createElement("form", {
        onSubmit: handleSubmit,
        className: "flex gap-2"
    }, /* @__PURE__ */ React3.createElement("input", {
        type: "text",
        value: message,
        onChange: function(e) {
            return setMessage(e.target.value);
        },
        placeholder: placeholder,
        maxLength: maxLength,
        disabled: disabled || !isConnected,
        className: "flex-1 px-3 py-2 rounded border"
    }), /* @__PURE__ */ React3.createElement("button", {
        type: "submit",
        disabled: disabled || !message.trim() || !isConnected,
        className: "px-4 py-2 rounded disabled:opacity-50"
    }, "Send"));
};
// src/components/Messages/index.tsx
var React4 = __toESM(require("react"));
// ../../node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs
function r(e) {
    var t, f, n = "";
    if ("string" == typeof e || "number" == typeof e) n += e;
    else if ("object" == (typeof e === "undefined" ? "undefined" : _type_of(e))) if (Array.isArray(e)) {
        var o = e.length;
        for(t = 0; t < o; t++)e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
    } else for(f in e)e[f] && (n && (n += " "), n += f);
    return n;
}
function clsx() {
    for(var e, t, f = 0, n = "", o = arguments.length; f < o; f++)(e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
    return n;
}
// src/components/Messages/index.tsx
var Messages = function(param) {
    var _param_className = param.className, className = _param_className === void 0 ? "" : _param_className, _param_containerClassName = param.containerClassName, containerClassName = _param_containerClassName === void 0 ? "" : _param_containerClassName, _param_messageClassName = param.messageClassName, messageClassName = _param_messageClassName === void 0 ? "" : _param_messageClassName, renderMessage = param.renderMessage;
    var _useChat = useChat(), messages = _useChat.messages, currentUserId = _useChat.currentUserId;
    var messagesEndRef = React4.useRef(null);
    var scrollToBottom = function() {
        var _messagesEndRef_current;
        (_messagesEndRef_current = messagesEndRef.current) === null || _messagesEndRef_current === void 0 ? void 0 : _messagesEndRef_current.scrollIntoView({
            behavior: "smooth"
        });
    };
    React4.useEffect(function() {
        scrollToBottom();
    }, [
        messages
    ]);
    var defaultRenderMessage = function(message) {
        var _message_username;
        return /* @__PURE__ */ React4.createElement("div", {
            key: message.timestamp,
            className: clsx(messageClassName, "flex flex-col max-w-[70%]", message.user_id === currentUserId ? "ml-auto items-end" : "items-start")
        }, /* @__PURE__ */ React4.createElement("span", {
            className: "text-xs text-muted-foreground"
        }, message.user_id === currentUserId ? "" : (_message_username = message.username) !== null && _message_username !== void 0 ? _message_username : "Some user"), /* @__PURE__ */ React4.createElement("div", {
            className: clsx("rounded-lg px-1 max-w-[90%]", message.user_id === currentUserId ? "bg-blue-500 text-white self-end" : "bg-neutral-200 text-neutral-800 self-start")
        }, /* @__PURE__ */ React4.createElement("p", null, message.content)));
    };
    return /* @__PURE__ */ React4.createElement("div", {
        className: "flex flex-col h-full ".concat(className)
    }, /* @__PURE__ */ React4.createElement("div", {
        className: "flex-1 overflow-y-auto p-4 space-y-4 ".concat(containerClassName)
    }, messages.map(function(message, index) {
        return /* @__PURE__ */ React4.createElement("div", {
            key: index,
            className: "max-w-[70%]"
        }, renderMessage ? renderMessage(message) : defaultRenderMessage(message));
    }), /* @__PURE__ */ React4.createElement("div", {
        ref: messagesEndRef
    })));
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
    ChatList: ChatList,
    ChatProvider: ChatProvider,
    MessageInput: MessageInput,
    Messages: Messages,
    useChat: useChat
});
//# sourceMappingURL=index.js.map