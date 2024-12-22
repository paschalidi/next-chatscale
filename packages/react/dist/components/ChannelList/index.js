'use client';
import * as React from 'react';
import { useChat } from "../../context/ChatContext";
export var ChannelList = function (_a) {
    var _b;
    var _c = _a.limit, limit = _c === void 0 ? 50 : _c, onChatSelect = _a.onChatSelect, _d = _a.customStyles, customStyles = _d === void 0 ? {} : _d, renderItem = _a.renderItem;
    var channels = useChat().channels;
    if (channels.isLoading) {
        return React.createElement("div", null, "Loading chats...");
    }
    return (React.createElement("div", { className: customStyles.container }, (_b = channels.data) === null || _b === void 0 ? void 0 : _b.map(function (channel) { return (React.createElement("div", { key: channel.id, onClick: function () { return onChatSelect === null || onChatSelect === void 0 ? void 0 : onChatSelect(channel); }, className: customStyles.chatItem }, renderItem ? (renderItem(channel)) : (React.createElement("div", null,
        React.createElement("h3", null, channel.name))))); })));
};
