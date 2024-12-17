import { useEffect, useState } from 'react';
import { fetchChannels } from "../../services";
import { ChannelsResponseDto } from "../../types";

interface UseChannelsReturn {
  channels: ChannelsResponseDto | undefined;
  currentChannelId: string | undefined;
  isChannelsLoading: boolean;
  channelsError: Error | null;
  refetchChannels: () => Promise<void>;
}

export const useChannels = ({ channelName }: { channelName: string }): UseChannelsReturn => {
  const [data, setData] = useState<ChannelsResponseDto>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchChannels();
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch channels'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    currentChannelId: data?.find(channel => channelName === channel.name)?.id,
    channels: data,
    isChannelsLoading: isLoading,
    channelsError: error,
    refetchChannels: fetchData
  };
};