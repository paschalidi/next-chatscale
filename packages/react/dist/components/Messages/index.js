import * as React from 'react';
import { useEffect } from 'react';
import { useChat } from '../../context/ChatContext';
import { clsx } from "clsx";
export var Messages = function (_a) {
    var _b = _a.className, className = _b === void 0 ? '' : _b, _c = _a.containerClassName, containerClassName = _c === void 0 ? '' : _c, _d = _a.messageClassName, messageClassName = _d === void 0 ? '' : _d, renderMessage = _a.renderMessage;
    var _e = useChat(), _f = _e.messages, messages = _f.data, refetch = _f.refetch, currentUserId = _e.currentUser.id;
    var messagesEndRef = React.useRef(null);
    useEffect(function () {
        refetch();
    }, []);
    var scrollToBottom = function () {
        var _a;
        (_a = messagesEndRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
    };
    React.useEffect(function () {
        scrollToBottom();
    }, [messages]);
    var defaultRenderMessage = function (message) {
        var _a;
        return (React.createElement("div", { key: message.participant_id.toString() + message.content, className: clsx(messageClassName, 'flex flex-col max-w-[70%]', message.participant_id === currentUserId
                ? 'ml-auto items-end'
                : 'items-start') },
            React.createElement("span", { className: "text-xs text-muted-foreground" }, message.participant_id === currentUserId
                ? ''
                : (_a = message.participant_id) !== null && _a !== void 0 ? _a : 'Some user'),
            React.createElement("div", { className: clsx('rounded-lg px-1 max-w-[90%]', message.participant_id === currentUserId
                    ? 'bg-blue-500 text-white self-end'
                    : 'bg-neutral-200 text-neutral-800 self-start') },
                React.createElement("p", null, message.content))));
    };
    return (React.createElement("div", { className: "flex flex-col h-full ".concat(className) },
        React.createElement("div", { className: "flex-1 overflow-y-auto p-4 space-y-4 ".concat(containerClassName) }, messages === null || messages === void 0 ? void 0 :
            messages.map(function (message, index) { return (React.createElement("div", { key: index, className: "max-w-[70%]" }, renderMessage ? renderMessage(message) : defaultRenderMessage(message))); }),
            React.createElement("div", { ref: messagesEndRef }))));
};
