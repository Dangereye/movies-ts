import { useQuery } from "@tanstack/react-query";

export default function useMakeQuery(
  key: string | undefined,
  endpoint: string | undefined
) {
  const fetchData = async (endpoint: string | undefined) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/${endpoint}?api_key=2f965fedbcdec55779f7e2e60eb62e59`
    );
    return res.json();
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: [key],
    queryFn: () => fetchData(endpoint),
  });

  return { data, isLoading, isError };
}
