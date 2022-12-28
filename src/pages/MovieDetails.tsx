import { useParams } from "react-router-dom";

// Components
import Article from "../components/article/Article";
import Container from "../components/container/Container";
import Header from "../components/header/Header";
import ImageComponent from "../components/image/Image";
import Main from "../components/main/Main";
import Navigation from "../components/navigation/Navigation";
import BodyText from "../components/typography/BodyText";
import H1 from "../components/typography/H1";
import H2 from "../components/typography/H2";

// Hooks
import useMakeQuery from "../hooks/useMakeQuery";

// Interfaces
import { IMovie } from "../interfaces/IMovie";

export default function MovieDetails() {
  const { movieId } = useParams();
  const {
    data: movie,
    isError,
    isLoading,
  } = useMakeQuery<IMovie>(`movie-${movieId}`, `movie/${movieId}`);

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
          <ImageComponent
            src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
            fallback="/images/error_500x750.webp"
            alt={movie?.title}
          />
          <div className="header__content">
            <H1 heading={movie?.title} />
          </div>
        </Container>
      </Header>
    </>
  );
}
