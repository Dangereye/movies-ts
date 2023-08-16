// React query
import { useQuery } from '@tanstack/react-query';

export default function useMakeQuery<T>(
  key: string | undefined,
  endpoint: string | undefined,
  append?: string
) {
  const fetchData = async (endpoint: string | undefined, append = '') => {
    const apiKey = process.env.REACT_APP_KEY;
    const res = await fetch(
      `https://api.themoviedb.org/3/${endpoint}?api_key=${apiKey}${append}`
    );
    return res.json();
  };

  const { data, isLoading, isError, isFetching, refetch } = useQuery<T>({
    queryKey: [key],
    queryFn: () => fetchData(endpoint, append),
  });

  return { data, isLoading, isError, isFetching, refetch };
}
