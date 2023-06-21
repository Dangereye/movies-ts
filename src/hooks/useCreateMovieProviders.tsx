// Interfaces
import { IMovieProviders } from '../interfaces/IMovieProviders';

// Hooks
import useMakeQuery from './useMakeQuery';

export default function useCreateMovieProviders() {
  let movieProviders: {
    display_priority: number;
    logo_path: string;
    provider_name: string;
    provider_id: number;
  }[] = [];

  const { data, isError, isLoading } = useMakeQuery<IMovieProviders>(
    `movie-providers-list`,
    `watch/providers/movie`
  );

  if (isLoading) {
    return [];
  }

  if (isError) {
    return [];
  }

  if (data) {
    data.results.forEach((mp) => {
      movieProviders = [
        ...movieProviders,
        {
          display_priority: mp.display_priority,
          logo_path: mp.logo_path,
          provider_name: mp.provider_name,
          provider_id: mp.provider_id,
        },
      ];
    });
  }

  return movieProviders;
}
