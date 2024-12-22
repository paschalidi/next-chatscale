var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { useEffect, useRef, useState } from 'react';
import { config } from "../../config";
export function useWebSocket(channelName) {
    var _a = useState(false), isConnected = _a[0], setIsConnected = _a[1];
    var _b = useState([]), messages = _b[0], setMessages = _b[1];
    var ws = useRef(null);
    useEffect(function () {
        var connect = function () {
            var _a;
            // Only create a new connection if there isn't one already
            console.log(ws.current, (_a = ws.current) === null || _a === void 0 ? void 0 : _a.readyState);
            console.log('Connecting to WebSocket the ', channelName);
            ws.current = new WebSocket("".concat(config.rust_ws_url, "/chat/").concat(channelName));
            ws.current.onopen = function () {
                setIsConnected(true);
                console.log('WebSocket connected');
            };
            ws.current.onmessage = function (event) {
                var data = JSON.parse(event.data);
                setMessages(function (prev) { return __spreadArray(__spreadArray([], prev, true), [{
                        participant_id: data.participant_id,
                        channel_name: data.channel_name,
                        content: data.content,
                    }], false); });
            };
            ws.current.onclose = function () {
                setIsConnected(false);
                console.log('WebSocket closed');
            };
        };
        connect();
        // Cleanup function
        return function () {
            // Only close if connection exists and is open
            if (ws.current && ws.current.readyState === WebSocket.OPEN) {
                ws.current.close();
            }
        };
    }, [channelName]);
    return { isConnected: isConnected, messages: messages, ws: ws.current };
}
