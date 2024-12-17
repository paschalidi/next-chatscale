interface ErrorLog {
  message: string;
  stack?: string;
  timestamp: string;

  [key: string]: any; // Additional dynamic properties
}

export const logError = (
  error: unknown,
  additionalContext: Record<string, unknown> = {}
): void => {
  // Determine the error message and stack based on the error type
  let message: string;
  let stack: string | undefined;

  if (error instanceof Error) {
    message = error.message;
    stack = error.stack;
  } else {
    message = String(error); // Convert error to string if it's not an instance of Error
    stack = undefined;
  }

  const errorLog: ErrorLog = {
    message,
    stack,
    timestamp: new Date().toISOString(),
    ...additionalContext
  };

  // Sentry.captureException(error, {
  //   extra: errorLog
  // });

  console.error(errorLog);
};
