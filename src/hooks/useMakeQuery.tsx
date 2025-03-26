// React query
import { useQuery } from '@tanstack/react-query';

export default function useMakeQuery<T>(
  key: string | undefined,
  endpoint: string | undefined,
  append?: string
) {
  const fetchData = async (endpoint: string | undefined, append = '') => {
    const res = await fetch(
      `/.netlify/functions/tmdbProxy?endpoint=${endpoint}&append=${encodeURIComponent(
        append
      )}`
    );
    return res.json();
  };

  const { data, isLoading, isError, isFetching, refetch } = useQuery<T>({
    queryKey: [key],
    queryFn: () => fetchData(endpoint, append),
  });

  return { data, isLoading, isError, isFetching, refetch };
}
