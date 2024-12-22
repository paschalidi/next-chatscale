var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import * as React from 'react';
import { useMemo } from 'react';
import { useChannels } from "./useChannels";
import { useWebSocket } from "./useWebsocket";
import { useChannelMessages } from "./useChannelMessage";
import { config } from "../../config";
var ChatContext = React.createContext(null);
export var ChatProvider = function (_a) {
    var children = _a.children, organizationToken = _a.organizationToken, channelName = _a.channelName, userId = _a.userId, _b = _a.userName, userName = _b === void 0 ? 'Unknown user' : _b, _c = _a.options, options = _c === void 0 ? {
        reconnectInterval: 3000,
        maxReconnectAttempts: 5,
        debug: false
    } : _c;
    var _d = useWebSocket(channelName), isConnected = _d.isConnected, wsMessages = _d.messages, ws = _d.ws;
    var _e = useChannels({ channelName: channelName }), channels = _e.channels, isChannelsLoading = _e.isChannelsLoading, channelsError = _e.channelsError, refetchChannels = _e.refetchChannels, currentChannelId = _e.currentChannelId;
    var _f = useChannelMessages(currentChannelId), channelMessages = _f.messages, areMessagesLoading = _f.areMessagesLoading, refetchMessages = _f.refetchMessages, messagesError = _f.messagesError;
    var value = useMemo(function () { return ({
        organizationToken: organizationToken,
        currentUser: {
            id: userId,
            userName: userName,
            isConnected: isConnected,
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
            data: __spreadArray(__spreadArray([], (channelMessages || []), true), (wsMessages || []), true),
            isLoading: areMessagesLoading,
            error: messagesError,
            refetch: refetchMessages
        },
        wsEndpoint: "".concat(config.rust_ws_url, "/chat/").concat(channelName),
        ws: ws,
    }); }, [
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
    return (React.createElement(ChatContext.Provider, { value: value }, children));
};
export var useChat = function () {
    var context = React.useContext(ChatContext);
    if (!context) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
};
