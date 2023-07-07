// Hooks
import useMakeQuery from './useMakeQuery';

// Interfaces
import { IGenres } from '../interfaces/IGenres';

export default function useCreateGenres(key: string, endPoint: string) {
  let genres: { id: number; name: string }[] = [];

  const { data, isError, isLoading } = useMakeQuery<IGenres>(key, endPoint);

  if (isLoading) {
    return [];
  }

  if (isError) {
    return [];
  }

  data?.genres?.forEach((g) => {
    genres = [...genres, { id: g.id, name: g.name }];
  });

  return genres;
}
