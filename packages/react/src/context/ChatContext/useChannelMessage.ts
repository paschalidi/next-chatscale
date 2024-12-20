import { useCallback, useEffect, useState } from 'react';

import { MessagesResponseDto } from "../../types";
import { fetchMessagesByChannelId } from "../../services";

export function useChannelMessages(channelId?: string) {
  const [messages, setMessages] = useState<MessagesResponseDto>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchMessages = useCallback(async () => {
    if (!channelId) return;

    setIsLoading(true);
    try {
      const { data } = await fetchMessagesByChannelId({ channelId });
      setMessages(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch messages'));
    } finally {
      setIsLoading(false);
    }
  }, [channelId]);

  useEffect(() => {
    fetchMessages();
  }, [channelId, fetchMessages]);

  return { messages, areMessagesLoading: isLoading, messagesError: error, refetchMessages: fetchMessages };
}