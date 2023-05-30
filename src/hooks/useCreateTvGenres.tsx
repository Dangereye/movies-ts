// Hooks
import useMakeQuery from './useMakeQuery';

// Interfaces
import { IGenres } from '../interfaces/IGenres';

export default function useCreateTvGenres() {
  let tvGenres: { id: number; name: string }[] = [];

  const {
    data: genreList,
    isError,
    isLoading,
  } = useMakeQuery<IGenres>(`tv-genre-list`, `genre/tv/list`);

  if (isLoading) {
    return [];
  }

  if (isError) {
    return [];
  }

  genreList?.genres?.forEach((g) => {
    tvGenres = [...tvGenres, { id: g.id, name: g.name }];
  });

  return tvGenres;
}
