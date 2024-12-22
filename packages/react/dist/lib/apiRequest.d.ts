export declare function apiRequest<T>(path: string, fetchOptions?: RequestInit, serverOptions?: {
    serverUrl?: string;
    cache?: boolean;
}): Promise<T>;
