// src/context/ChatContext/index.tsx
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
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
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
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
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
import * as React from "react";
import { useMemo } from "react";
// src/context/ChatContext/useChannels.ts
import { useEffect, useState } from "react";
// src/lib/logError.ts
var logError = function(error) {
    var additionalContext = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var message;
    var stack;
    if (_instanceof(error, Error)) {
        message = error.message;
        stack = error.stack;
    } else {
        message = String(error);
        stack = void 0;
    }
    var errorLog = _object_spread({
        message: message,
        stack: stack,
        timestamp: /* @__PURE__ */ new Date().toISOString()
    }, additionalContext);
    console.error(errorLog);
};
// src/config.ts
var config = {
    rust_api_url: "https://api.rechat.cloud",
    rust_ws_url: "wss://api.rechat.cloud/ws"
};
function apiRequest(path) {
    return _apiRequest.apply(this, arguments);
}
function _apiRequest() {
    _apiRequest = // src/lib/apiRequest.ts
    _async_to_generator(function(path) {
        var fetchOptions, serverOptions, defaultHeaders, _serverOptions_serverUrl, serverUrl, url, response, contentType, errorData, error;
        var _arguments = arguments;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    fetchOptions = _arguments.length > 1 && _arguments[1] !== void 0 ? _arguments[1] : {}, serverOptions = _arguments.length > 2 && _arguments[2] !== void 0 ? _arguments[2] : {};
                    defaultHeaders = {
                        "Content-Type": "application/json"
                    };
                    _serverOptions_serverUrl = serverOptions.serverUrl, serverUrl = _serverOptions_serverUrl === void 0 ? config.rust_api_url : _serverOptions_serverUrl;
                    url = "".concat(serverUrl).concat(path);
                    _state.label = 1;
                case 1:
                    _state.trys.push([
                        1,
                        6,
                        ,
                        7
                    ]);
                    return [
                        4,
                        fetch(url, _object_spread_props(_object_spread({}, fetchOptions), {
                            headers: _object_spread({}, defaultHeaders, fetchOptions.headers)
                        }))
                    ];
                case 2:
                    response = _state.sent();
                    contentType = response.headers.get("content-type");
                    if (!!response.ok) return [
                        3,
                        4
                    ];
                    if (!contentType || !contentType.includes("application/json")) {
                        throw new Error("".concat(url, " <- Error ").concat(response.status, ": Invalid content-type. Expected application/json, got ").concat(JSON.stringify(response.body)));
                    }
                    return [
                        4,
                        response.json()
                    ];
                case 3:
                    errorData = _state.sent();
                    throw new Error("".concat(url, " <- Error ").concat(response.status, ": ").concat(JSON.stringify(errorData, null, 2), " "));
                case 4:
                    if (response.status === 204) {
                        return [
                            2,
                            {
                                status: "204"
                            }
                        ];
                    }
                    return [
                        4,
                        response.json()
                    ];
                case 5:
                    return [
                        2,
                        _state.sent()
                    ];
                case 6:
                    error = _state.sent();
                    if (_instanceof(error, Error)) {
                        logErrorMetadata(error, url);
                    } else {
                        logError(error, {
                            context: "Unexpected Error",
                            url: url
                        });
                    }
                    throw error;
                case 7:
                    return [
                        2
                    ];
            }
        });
    });
    return _apiRequest.apply(this, arguments);
}
var logErrorMetadata = function(error, url) {
    if (error.name === "AbortError") {
        logError("Timeout – ".concat(error.name, " ").concat(error), {
            context: "Timeout Error",
            url: url
        });
    } else {
        logError("".concat(error.name, " ").concat(error), {
            context: "Fetch Error",
            url: url
        });
    }
};
// src/services/index.ts
var fetchChannels = /*#__PURE__*/ function() {
    var _ref = _async_to_generator(function() {
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    return [
                        4,
                        apiRequest("/api/channels", {
                            method: "GET",
                            headers: {
                                Accept: "application/json"
                            }
                        })
                    ];
                case 1:
                    return [
                        2,
                        _state.sent()
                    ];
            }
        });
    });
    return function fetchChannels() {
        return _ref.apply(this, arguments);
    };
}();
var postMessage = /*#__PURE__*/ function() {
    var _ref = _async_to_generator(function(message) {
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    return [
                        4,
                        apiRequest("/api/messages", {
                            method: "POST",
                            body: JSON.stringify(message)
                        })
                    ];
                case 1:
                    return [
                        2,
                        _state.sent()
                    ];
            }
        });
    });
    return function postMessage(message) {
        return _ref.apply(this, arguments);
    };
}();
var fetchMessagesByChannelId = /*#__PURE__*/ function() {
    var _ref = _async_to_generator(function(param) {
        var channelId;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    channelId = param.channelId;
                    return [
                        4,
                        apiRequest("/api/messages/".concat(channelId), {
                            method: "GET",
                            headers: {
                                Accept: "application/json"
                            }
                        })
                    ];
                case 1:
                    return [
                        2,
                        _state.sent()
                    ];
            }
        });
    });
    return function fetchMessagesByChannelId(_) {
        return _ref.apply(this, arguments);
    };
}();
// src/context/ChatContext/useChannels.ts
var useChannels = function(param) {
    var channelName = param.channelName;
    var _data_find;
    var _useState = _sliced_to_array(useState(), 2), data = _useState[0], setData = _useState[1];
    var _useState1 = _sliced_to_array(useState(false), 2), isLoading = _useState1[0], setIsLoading = _useState1[1];
    var _useState2 = _sliced_to_array(useState(null), 2), error = _useState2[0], setError = _useState2[1];
    var fetchData = /*#__PURE__*/ function() {
        var _ref = _async_to_generator(function() {
            var _ref, data2, err;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        setIsLoading(true);
                        setError(null);
                        _state.label = 1;
                    case 1:
                        _state.trys.push([
                            1,
                            3,
                            4,
                            5
                        ]);
                        return [
                            4,
                            fetchChannels()
                        ];
                    case 2:
                        _ref = _state.sent(), data2 = _ref.data;
                        setData(data2);
                        return [
                            3,
                            5
                        ];
                    case 3:
                        err = _state.sent();
                        setError(_instanceof(err, Error) ? err : new Error("Failed to fetch channels"));
                        return [
                            3,
                            5
                        ];
                    case 4:
                        setIsLoading(false);
                        return [
                            7
                        ];
                    case 5:
                        return [
                            2
                        ];
                }
            });
        });
        return function fetchData() {
            return _ref.apply(this, arguments);
        };
    }();
    useEffect(function() {
        fetchData();
    }, []);
    return {
        currentChannelId: data === null || data === void 0 ? void 0 : (_data_find = data.find(function(channel) {
            return channelName === channel.name;
        })) === null || _data_find === void 0 ? void 0 : _data_find.id,
        channels: data,
        isChannelsLoading: isLoading,
        channelsError: error,
        refetchChannels: fetchData
    };
};
// src/context/ChatContext/useWebsocket.ts
import { useEffect as useEffect2, useRef, useState as useState2 } from "react";
function useWebSocket(channelName) {
    var _useState2 = _sliced_to_array(useState2(false), 2), isConnected = _useState2[0], setIsConnected = _useState2[1];
    var _useState21 = _sliced_to_array(useState2([]), 2), messages = _useState21[0], setMessages = _useState21[1];
    var ws = useRef(null);
    useEffect2(function() {
        var connect = function() {
            var _ws_current;
            console.log(ws.current, (_ws_current = ws.current) === null || _ws_current === void 0 ? void 0 : _ws_current.readyState);
            console.log("Connecting to WebSocket the ", channelName);
            ws.current = new WebSocket("".concat(config.rust_ws_url, "/chat/").concat(channelName));
            ws.current.onopen = function() {
                setIsConnected(true);
                console.log("WebSocket connected");
            };
            ws.current.onmessage = function(event) {
                var data = JSON.parse(event.data);
                setMessages(function(prev) {
                    return _to_consumable_array(prev).concat([
                        {
                            participant_id: data.participant_id,
                            channel_name: data.channel_name,
                            content: data.content
                        }
                    ]);
                });
            };
            ws.current.onclose = function() {
                setIsConnected(false);
                console.log("WebSocket closed");
            };
        };
        connect();
        return function() {
            if (ws.current && ws.current.readyState === WebSocket.OPEN) {
                ws.current.close();
            }
        };
    }, [
        channelName
    ]);
    return {
        isConnected: isConnected,
        messages: messages,
        ws: ws.current
    };
}
// src/context/ChatContext/useChannelMessage.ts
import { useCallback, useEffect as useEffect3, useState as useState3 } from "react";
function useChannelMessages(channelId) {
    var _useState3 = _sliced_to_array(useState3([]), 2), messages = _useState3[0], setMessages = _useState3[1];
    var _useState31 = _sliced_to_array(useState3(false), 2), isLoading = _useState31[0], setIsLoading = _useState31[1];
    var _useState32 = _sliced_to_array(useState3(null), 2), error = _useState32[0], setError = _useState32[1];
    var fetchMessages = useCallback(/*#__PURE__*/ _async_to_generator(function() {
        var data, err;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    if (!channelId) return [
                        2
                    ];
                    setIsLoading(true);
                    _state.label = 1;
                case 1:
                    _state.trys.push([
                        1,
                        3,
                        4,
                        5
                    ]);
                    return [
                        4,
                        fetchMessagesByChannelId({
                            channelId: channelId
                        })
                    ];
                case 2:
                    data = _state.sent().data;
                    setMessages(data);
                    return [
                        3,
                        5
                    ];
                case 3:
                    err = _state.sent();
                    setError(_instanceof(err, Error) ? err : new Error("Failed to fetch messages"));
                    return [
                        3,
                        5
                    ];
                case 4:
                    setIsLoading(false);
                    return [
                        7
                    ];
                case 5:
                    return [
                        2
                    ];
            }
        });
    }), [
        channelId
    ]);
    useEffect3(function() {
        fetchMessages();
    }, [
        channelId,
        fetchMessages
    ]);
    return {
        messages: messages,
        areMessagesLoading: isLoading,
        messagesError: error,
        refetchMessages: fetchMessages
    };
}
// src/context/ChatContext/index.tsx
var ChatContext = React.createContext(null);
var ChatProvider = function(param) {
    var children = param.children, organizationToken = param.organizationToken, channelName = param.channelName, userId = param.userId, _param_userName = param.userName, userName = _param_userName === void 0 ? "Unknown user" : _param_userName, _param_options = param.options, options = _param_options === void 0 ? {
        reconnectInterval: 3e3,
        maxReconnectAttempts: 5,
        debug: false
    } : _param_options;
    var _useWebSocket = useWebSocket(channelName), isConnected = _useWebSocket.isConnected, wsMessages = _useWebSocket.messages, ws = _useWebSocket.ws;
    var _useChannels = useChannels({
        channelName: channelName
    }), channels = _useChannels.channels, isChannelsLoading = _useChannels.isChannelsLoading, channelsError = _useChannels.channelsError, refetchChannels = _useChannels.refetchChannels, currentChannelId = _useChannels.currentChannelId;
    var _useChannelMessages = useChannelMessages(currentChannelId), channelMessages = _useChannelMessages.messages, areMessagesLoading = _useChannelMessages.areMessagesLoading, refetchMessages = _useChannelMessages.refetchMessages, messagesError = _useChannelMessages.messagesError;
    var value = useMemo(function() {
        return {
            organizationToken: organizationToken,
            currentUser: {
                id: userId,
                userName: userName,
                isConnected: isConnected
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
                data: _to_consumable_array(channelMessages || []).concat(_to_consumable_array(wsMessages || [])),
                isLoading: areMessagesLoading,
                error: messagesError,
                refetch: refetchMessages
            },
            wsEndpoint: "".concat(config.rust_ws_url, "/chat/").concat(channelName),
            ws: ws
        };
    }, [
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
// src/components/ChannelList/index.tsx
import * as React2 from "react";
var ChannelList = function(param) {
    var _param_limit = param.limit, limit = _param_limit === void 0 ? 50 : _param_limit, onChatSelect = param.onChatSelect, _param_customStyles = param.customStyles, customStyles = _param_customStyles === void 0 ? {} : _param_customStyles, renderItem = param.renderItem;
    var _channels_data;
    var channels = useChat().channels;
    if (channels.isLoading) {
        return /* @__PURE__ */ React2.createElement("div", null, "Loading chats...");
    }
    return /* @__PURE__ */ React2.createElement("div", {
        className: customStyles.container
    }, (_channels_data = channels.data) === null || _channels_data === void 0 ? void 0 : _channels_data.map(function(channel) {
        return /* @__PURE__ */ React2.createElement("div", {
            key: channel.id,
            onClick: function() {
                return onChatSelect === null || onChatSelect === void 0 ? void 0 : onChatSelect(channel);
            },
            className: customStyles.chatItem
        }, renderItem ? renderItem(channel) : /* @__PURE__ */ React2.createElement("div", null, /* @__PURE__ */ React2.createElement("h3", null, channel.name)));
    }));
};
// src/components/MessageInput/index.tsx
import * as React3 from "react";
var MessageInput = function(param) {
    var _param_placeholder = param.placeholder, placeholder = _param_placeholder === void 0 ? "Type a message..." : _param_placeholder, onSend = param.onSend, _param_maxLength = param.maxLength, maxLength = _param_maxLength === void 0 ? 1e3 : _param_maxLength, _param_disabled = param.disabled, disabled = _param_disabled === void 0 ? false : _param_disabled;
    var _React3_useState = _sliced_to_array(React3.useState(""), 2), message = _React3_useState[0], setMessage = _React3_useState[1];
    var _useChat = useChat(), ws = _useChat.ws, _useChat_currentUser = _useChat.currentUser, currentUserId = _useChat_currentUser.id, isConnected = _useChat_currentUser.isConnected, _useChat_activeChannel = _useChat.activeChannel, channelName = _useChat_activeChannel.name;
    var handleSubmit = /*#__PURE__*/ function() {
        var _ref = _async_to_generator(function(e) {
            var data, e2;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        e.preventDefault();
                        if (!(message.trim() && ws && isConnected)) return [
                            3,
                            4
                        ];
                        data = {
                            channel_name: channelName,
                            participant_id: currentUserId,
                            content: message
                        };
                        ws.send(JSON.stringify(data));
                        onSend === null || onSend === void 0 ? void 0 : onSend(message);
                        setMessage("");
                        _state.label = 1;
                    case 1:
                        _state.trys.push([
                            1,
                            3,
                            ,
                            4
                        ]);
                        return [
                            4,
                            postMessage(data)
                        ];
                    case 2:
                        _state.sent();
                        return [
                            3,
                            4
                        ];
                    case 3:
                        e2 = _state.sent();
                        console.error(e2);
                        return [
                            3,
                            4
                        ];
                    case 4:
                        return [
                            2
                        ];
                }
            });
        });
        return function handleSubmit(e) {
            return _ref.apply(this, arguments);
        };
    }();
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
import * as React4 from "react";
import { useEffect as useEffect5 } from "react";
// ../../node_modules/clsx/dist/clsx.mjs
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
    var _useChat = useChat(), _useChat_messages = _useChat.messages, messages = _useChat_messages.data, refetch = _useChat_messages.refetch, _useChat_currentUser = _useChat.currentUser, currentUserId = _useChat_currentUser.id;
    var messagesEndRef = React4.useRef(null);
    useEffect5(function() {
        refetch();
    }, []);
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
        var _message_participant_id;
        return /* @__PURE__ */ React4.createElement("div", {
            key: message.participant_id.toString() + message.content,
            className: clsx(messageClassName, "flex flex-col max-w-[70%]", message.participant_id === currentUserId ? "ml-auto items-end" : "items-start")
        }, /* @__PURE__ */ React4.createElement("span", {
            className: "text-xs text-muted-foreground"
        }, message.participant_id === currentUserId ? "" : (_message_participant_id = message.participant_id) !== null && _message_participant_id !== void 0 ? _message_participant_id : "Some user"), /* @__PURE__ */ React4.createElement("div", {
            className: clsx("rounded-lg px-1 max-w-[90%]", message.participant_id === currentUserId ? "bg-blue-500 text-white self-end" : "bg-neutral-200 text-neutral-800 self-start")
        }, /* @__PURE__ */ React4.createElement("p", null, message.content)));
    };
    return /* @__PURE__ */ React4.createElement("div", {
        className: "flex flex-col h-full ".concat(className)
    }, /* @__PURE__ */ React4.createElement("div", {
        className: "flex-1 overflow-y-auto p-4 space-y-4 ".concat(containerClassName)
    }, messages === null || messages === void 0 ? void 0 : messages.map(function(message, index) {
        return /* @__PURE__ */ React4.createElement("div", {
            key: index,
            className: "max-w-[70%]"
        }, renderMessage ? renderMessage(message) : defaultRenderMessage(message));
    }), /* @__PURE__ */ React4.createElement("div", {
        ref: messagesEndRef
    })));
};
export { ChannelList, ChatProvider, MessageInput, Messages, useChat };
//# sourceMappingURL=index.mjs.map