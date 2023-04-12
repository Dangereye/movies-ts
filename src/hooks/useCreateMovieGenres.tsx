// Hooks
import useMakeQuery from './useMakeQuery';

// Interfaces
import { IMovieGenres } from '../interfaces/IMovieGenres';

export default function useCreateMovieGenres() {
  let movieGenres: { id: number; name: string }[] = [];

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
    movieGenres = [...movieGenres, { id: g.id, name: g.name }];
  });

  return movieGenres;
}
