import { useQuery } from "@tanstack/react-query";

export default function useMakeQuery<T>(
  key: string | undefined,
  endpoint: string | undefined,
  append?: string
) {
  const fetchData = async (endpoint: string | undefined, append = "") => {
    const res = await fetch(
      `https://api.themoviedb.org/3/${endpoint}?api_key=2f965fedbcdec55779f7e2e60eb62e59${append}`
    );
    return res.json();
  };

  const { data, isLoading, isError } = useQuery<T>({
    queryKey: [key],
    queryFn: () => fetchData(endpoint, append),
  });

  return { data, isLoading, isError };
}
