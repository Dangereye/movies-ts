import { QueryFunctionContext, useInfiniteQuery } from '@tanstack/react-query';

const fetchData = async ({ queryKey, pageParam = 1 }: QueryFunctionContext) => {
  const [endPoint, append] = queryKey;
  const res = await fetch(
    `https://api.themoviedb.org/3/${endPoint}?api_key=2f965fedbcdec55779f7e2e60eb62e59&page=${pageParam}${append}`
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
