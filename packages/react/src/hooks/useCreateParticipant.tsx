import { useCallback, useState } from 'react';
import { createParticipant } from '../services';
import type { TParticipantsResponse } from '../types';

interface UseCreateParticipantReturn {
  createParticipant: (params: { name: string; organizationId: string }) => Promise<{
    data: TParticipantsResponse;
    message: string;
  }>;
  isLoading: boolean;
  error: Error | null;
}

export const useCreateParticipant = (): UseCreateParticipantReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createNewParticipant = useCallback(async ({ name, organizationId }: {
    name: string;
    organizationId: string;
  }) => {
    try {
      setIsLoading(true);
      setError(null);
      return createParticipant({ name, organizationId });
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create participant'));
      throw err; // Re-throw the error instead of returning undefined
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    createParticipant: createNewParticipant,
    isLoading,
    error
  };
};