var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { logError } from './logError';
import { config } from "../config";
export function apiRequest(path_1) {
    return __awaiter(this, arguments, void 0, function (path, fetchOptions, serverOptions) {
        var defaultHeaders, _a, serverUrl, url, response, contentType, errorData, error_1;
        if (fetchOptions === void 0) { fetchOptions = {}; }
        if (serverOptions === void 0) { serverOptions = {}; }
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    defaultHeaders = {
                        'Content-Type': 'application/json',
                    };
                    _a = serverOptions.serverUrl, serverUrl = _a === void 0 ? config.rust_api_url : _a;
                    url = "".concat(serverUrl).concat(path);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, fetch(url, __assign(__assign({}, fetchOptions), { headers: __assign(__assign({}, defaultHeaders), fetchOptions.headers) }))];
                case 2:
                    response = _b.sent();
                    contentType = response.headers.get('content-type');
                    if (!!response.ok) return [3 /*break*/, 4];
                    // if the response is not ok, and is not a json but and html, eg 502 errors
                    if (!contentType || !contentType.includes('application/json')) {
                        throw new Error("".concat(url, " <- Error ").concat(response.status, ": Invalid content-type. Expected application/json, got ").concat(JSON.stringify(response.body)));
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    errorData = _b.sent();
                    throw new Error("".concat(url, " <- Error ").concat(response.status, ": ").concat(JSON.stringify(errorData, null, 2), " "));
                case 4:
                    if (response.status === 204) {
                        return [2 /*return*/, { status: '204' }];
                    }
                    return [4 /*yield*/, response.json()];
                case 5: return [2 /*return*/, (_b.sent())];
                case 6:
                    error_1 = _b.sent();
                    if (error_1 instanceof Error) {
                        logErrorMetadata(error_1, url);
                    }
                    else {
                        logError(error_1, { context: 'Unexpected Error', url: url });
                    }
                    throw error_1;
                case 7: return [2 /*return*/];
            }
        });
    });
}
var logErrorMetadata = function (error, url) {
    if (error.name === 'AbortError') {
        logError("Timeout \u2013 ".concat(error.name, " ").concat(error), {
            context: 'Timeout Error',
            url: url
        });
    }
    else {
        logError("".concat(error.name, " ").concat(error), { context: 'Fetch Error', url: url });
    }
};
