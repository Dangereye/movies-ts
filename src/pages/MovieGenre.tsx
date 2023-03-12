import { useParams } from "react-router-dom";
import H2 from "../components/typography/H2";
import useMakeQuery from "../hooks/useMakeQuery";
import { IMovieGenres } from "../interfaces/IMovieGenres";
import { IMovieMin } from "../interfaces/IMovieMin";

export default function MovieGenre() {
  const { genreId } = useParams();

  const {
    data: movie,
    isError,
    isLoading,
  } = useMakeQuery<IMovieMin>(
    `movie-genre-${genreId}`,
    `discover/movie`,
    `&with_genres=${genreId}`
  );

  const {
    data: genreList,
    isError: genreListIsError,
    isLoading: genreListIsLoading,
  } = useMakeQuery<IMovieGenres>(`movie-genre-list`, `genre/movie/list`);

  if (isLoading || genreListIsLoading) {
    return <H2 heading="Loading" />;
  }

  if (isError || genreListIsError) {
    return <H2 heading="Error" />;
  }
  return <>Movie Genre {genreId}</>;
}
