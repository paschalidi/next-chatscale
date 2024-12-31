import { useCallback, useState } from 'react';
import { createNewChannel } from '../services';
import type { ChannelsResponseDto } from '../types';

interface UseCreateChannelReturn {
  createChannel: (params: { name: string; organizationId: string }) => Promise<{
    data: ChannelsResponseDto;
    message: string;
  }>;
  isLoading: boolean;
  error: Error | null;
}

export const useCreateChannel = (): UseCreateChannelReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createChannel = useCallback(async ({ name, organizationId }: {
    name: string;
    organizationId: string;
  }) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await createNewChannel({ name, organizationId });
      return response;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create channel'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    createChannel,
    isLoading,
    error
  };
};