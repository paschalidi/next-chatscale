'use server'
import { config } from '@/config';
import { logError } from '@/lib/logError';

export async function apiRequest<T>(
  path: string,
  fetchOptions: RequestInit = {},
  serverOptions: { serverUrl?: string; cache?: boolean } = {}
): Promise<T> {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };
  const { serverUrl = config.chat_scale_api_url, } = serverOptions;
  const url = `${serverUrl}${path}`;

  try {

    const response = await fetch(url, {
      ...fetchOptions,
      headers: {
        ...defaultHeaders,
        ...fetchOptions.headers,
      },
    });

    const contentType = response.headers.get('content-type');

    if (!response.ok) {
      // if the response is not ok, and is not a json but and html, eg 502 errors
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error(
          `${url} <- Error ${response.status}: Invalid content-type. Expected application/json`
        );
      }

      const errorData = await response.json();


      throw new Error(
        `${url} <- Error ${response.status}: ${JSON.stringify(
          errorData,
          null,
          2
        )} `
      );
    }

    if (response.status === 204) {
      return { status: '204' } as T;
    }

    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof Error) {
      logErrorMetadata(error, url);
    } else {
      logError(error, { context: 'Unexpected Error', url });
    }
    throw error;
  }
}

const logErrorMetadata = (error: Error, url: string) => {
  if (error.name === 'AbortError') {
    logError(`Timeout – ${error.name} ${error}`, {
      context: 'Timeout Error',
      url
    });
  } else {
    logError(`${error.name} ${error}`, { context: 'Fetch Error', url });
  }
};
