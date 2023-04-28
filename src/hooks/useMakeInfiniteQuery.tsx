import { useInfiniteQuery } from '@tanstack/react-query';

const fetchData = async (
  endpoint: string | undefined,
  append = '',
  pageParam = 1
) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/${endpoint}?api_key=2f965fedbcdec55779f7e2e60eb62e59${append}&page=${pageParam}`
  );
  return res.json();
};

export default function useInfiniteFetchData<T>(
  endPoint: string | undefined,
  append: string | undefined,
  getNextPageParam: (lastPage: T) => string | null
) {
  return useInfiniteQuery<T>([endPoint], () => fetchData(endPoint, append), {
    getNextPageParam,
  });
}
