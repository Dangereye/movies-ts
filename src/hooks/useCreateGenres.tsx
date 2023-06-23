// Hooks
import useMakeQuery from './useMakeQuery';

// Interfaces
import { IGenres } from '../interfaces/IGenres';

export default function useCreateMovieGenres(key: string, endPoint: string) {
  let genres: { id: number; name: string }[] = [];

  const {
    data: genreList,
    isError,
    isLoading,
  } = useMakeQuery<IGenres>(`movie-genre-list`, `genre/movie/list`);

  if (isLoading) {
    return [];
  }

  if (isError) {
    return [];
  }

  genreList?.genres?.forEach((g) => {
    genres = [...genres, { id: g.id, name: g.name }];
  });

  return genres;
}
