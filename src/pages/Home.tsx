// Components
import Main from "../components/main/Main";
import Article from "../components/articles/Article";
import Container from "../components/container/Container";
import H2 from "../components/typography/H2";
import Cards from "../components/cards/Cards";
import ImageComponent from "../components/image/Image";
import CardContent from "../components/cards/card/CardContent";

// Interfaces
import { IPage } from "../interfaces/IPage";
import { IMovieMin } from "../interfaces/IMovieMin";
import { IPerson } from "../interfaces/IPerson";
import { ITVShowMin } from "../interfaces/ITVShowMin";

// Utilities
import { formatDate } from "../utilities/formatDate";

// Hooks
import useMakeQuery from "../hooks/useMakeQuery";

export default function LandingPage() {
  const {
    data: movies,
    isLoading: moviesIsLoading,
    isError: moviesIsError,
  } = useMakeQuery<IPage<IMovieMin>>("trending movies", "trending/movie/week");

  const {
    data: people,
    isLoading: peopleIsLoading,
    isError: peopleIsError,
  } = useMakeQuery<IPage<IPerson>>("trending people", "trending/person/week");

  const {
    data: tvshows,
    isLoading: tvshowsIsLoading,
    isError: tvshowsIsError,
  } = useMakeQuery<IPage<ITVShowMin>>("trending tvshows", "trending/tv/week");

  if (moviesIsLoading || peopleIsLoading || tvshowsIsLoading) {
    return <H2 heading="Loading" />;
  }

  if (moviesIsError || peopleIsError || tvshowsIsError) {
    return <H2 heading="Error" />;
  }

  return (
    <>
      <Main>
        {/* Trending Movies */}
        <Article name="article__trending-movies">
          <Container>
            <H2 heading="trending movies" />
            <Cards
              getID={(item: IMovieMin) => item.id}
              renderLink={(item) => `/movies/${item.id}`}
              renderItem={(item: IMovieMin) => (
                <>
                  <ImageComponent
                    src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                    fallback="/images/error_500x750.webp"
                    alt={item.title}
                  />
                  <CardContent
                    vote={item.vote_average}
                    heading={item.title}
                    body={formatDate(item.release_date)}
                  />
                </>
              )}
              data={movies?.results}
            />
          </Container>
        </Article>

        {/* Trending People */}
        <Article name="article__trending-people">
          <Container>
            <H2 heading="trending people" />
            <Cards
              getID={(item: IPerson) => item.id}
              renderLink={(item) => `/people/${item.id}`}
              renderItem={(item: IPerson) => (
                <>
                  <ImageComponent
                    src={`https://image.tmdb.org/t/p/w500/${item.profile_path}`}
                    fallback="/images/error_500x750.webp"
                    alt={item.name}
                  />
                  <CardContent
                    heading={item.name}
                    body={item.known_for_department}
                  />
                </>
              )}
              data={people?.results}
            />
          </Container>
        </Article>

        {/* Trending TV Shows */}
        <Article name="article__trending-people">
          <Container>
            <H2 heading="trending tv shows" />
            <Cards
              getID={(item: ITVShowMin) => item.id}
              renderLink={(item) => `/tv/${item.id}`}
              renderItem={(item: ITVShowMin) => (
                <>
                  <ImageComponent
                    src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                    fallback="/images/error_500x750.webp"
                    alt={item.name}
                  />
                  <CardContent
                    vote={item.vote_average}
                    heading={item.name}
                    body={formatDate(item.first_air_date)}
                  />
                </>
              )}
              data={tvshows?.results}
            />
          </Container>
        </Article>
      </Main>
    </>
  );
}
