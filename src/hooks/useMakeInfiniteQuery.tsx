// ReactQuery
import { QueryFunctionContext, useInfiniteQuery } from '@tanstack/react-query';

const fetchData = async ({ queryKey, pageParam = 1 }: QueryFunctionContext) => {
  const [endpoint, append] = queryKey as [string, string];

  const res = await fetch(
    `/.netlify/functions/tmdbProxy?endpoint=${endpoint}&append=${encodeURIComponent(
      append
    )}&page=${pageParam}`
  );
  return res.json();
};

export default function useInfiniteFetchData<T>(
  endPoint: string | undefined,
  append: string | undefined,
  getNextPageParam: (lastPage: T) => number | null
) {
  return useInfiniteQuery<T>([endPoint, append], fetchData, {
    getNextPageParam,
  });
}
