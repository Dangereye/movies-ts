import { Link, useParams } from "react-router-dom";
import Article from "../components/articles/Article";
import CardContent from "../components/cards/card/CardContent";
import Container from "../components/container/Container";
import ImageComponent from "../components/image/Image";
import Navigation from "../components/navigation/Navigation";
import SubNavbar from "../components/sub_navbar/SubNavbar";
import BodyText from "../components/typography/BodyText";
import H1 from "../components/typography/H1";
import H2 from "../components/typography/H2";
import { moviePages } from "../data/moviePages";
import useMakeQuery from "../hooks/useMakeQuery";
import { IMovieFull } from "../interfaces/IMovieFull";
export default function MovieCastCrew() {
  const { movieId } = useParams();

  const {
    data: movie,
    isError,
    isLoading,
  } = useMakeQuery<IMovieFull>(
    `movie-${movieId}`,
    `movie/${movieId}`,
    `&append_to_response=release_dates,credits,videos,external_ids,recommendations,similar,reviews`
  );

  if (isLoading) {
    return <H2 heading="Loading" />;
  }

  if (isError) {
    return <H2 heading="Error" />;
  }

  return (
    <>
      <SubNavbar>
        <Navigation
          data={moviePages}
          getID={(item) => item.name}
          getLink={(item) => item.link}
          renderItem={(item) => item.name}
          variant="horizontal"
        />
      </SubNavbar>
      <header className="header">
        <Container>
          <H1 heading={`${movie?.title}, Full cast & crew`} />
        </Container>
      </header>
      <Article name="Cast">
        <Container>
          <H2 heading={`cast ${movie?.credits.cast.length}`} />
          <div className="cards-list">
            {movie?.credits.cast
              .sort((a, b) => b.popularity - a.popularity)
              .map((person) => (
                <Link
                  key={person.id}
                  to={`/people/${person.id}`}
                  className="card"
                >
                  <ImageComponent
                    src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`}
                    fallback="/images/error_500x750.webp"
                    alt={person.name}
                  />
                  <CardContent heading={person.name}>
                    <BodyText text={`${person.character}`} />
                  </CardContent>
                </Link>
              ))}
          </div>
        </Container>
      </Article>
    </>
  );
}
