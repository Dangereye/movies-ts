// Hooks
import useMakeQuery from './useMakeQuery';

// Interfaces
import { IMovieGenres } from '../interfaces/IMovieGenres';

export default function useCreateMovieGenres() {
  let genres: { id: number; name: string }[] = [];

  const {
    data: genreList,
    isError,
    isLoading,
  } = useMakeQuery<IMovieGenres>(`movie-genre-list`, `genre/movie/list`);

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
