import { useParams } from "react-router-dom";
import Article from "../components/article/Article";
import Container from "../components/container/Container";
import Header from "../components/header/Header";
import Main from "../components/main/Main";
import BodyText from "../components/typography/BodyText";
import H1 from "../components/typography/H1";
import H2 from "../components/typography/H2";
import useMakeQuery from "../hooks/useMakeQuery";
import { IMovie } from "../interfaces/IMovie";

export default function MovieDetails() {
  const { movieId } = useParams();
  const {
    data: movie,
    isError,
    isLoading,
  } = useMakeQuery(
    `movie-${movieId}`,
    `movie/${movieId}`,
    `&append_to_response=release_dates`
  );

  if (isLoading) {
    return <H2 heading="Loading" />;
  }

  if (isError) {
    return <H2 heading="Error" />;
  }
  return (
    <>
      <Header>
        <Container>
          <H1 heading={movie.title} />
        </Container>
      </Header>
    </>
  );
}
