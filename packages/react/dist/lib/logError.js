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
export var logError = function (error, additionalContext) {
    if (additionalContext === void 0) { additionalContext = {}; }
    // Determine the error message and stack based on the error type
    var message;
    var stack;
    if (error instanceof Error) {
        message = error.message;
        stack = error.stack;
    }
    else {
        message = String(error); // Convert error to string if it's not an instance of Error
        stack = undefined;
    }
    var errorLog = __assign({ message: message, stack: stack, timestamp: new Date().toISOString() }, additionalContext);
    // Sentry.captureException(error, {
    //   extra: errorLog
    // });
    console.error(errorLog);
};
