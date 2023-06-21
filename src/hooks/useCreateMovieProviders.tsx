import useMakeQuery from './useMakeQuery';

export default function useCreateMovieProviders() {
  let movieProviders: {
    display_priorities: { [key: string]: number };
    display_priority: number;
    logo_path: string;
    provider_name: string;
    provider_id: number;
  }[] = [];

  const { data, isError, isLoading } = useMakeQuery(
    `movie-providers-list`,
    `watch/providers/movie`
  );

  if (isLoading) {
    return [];
  }

  if (isError) {
    return [];
  }

  return movieProviders;
}
