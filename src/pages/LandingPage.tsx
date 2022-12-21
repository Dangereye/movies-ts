import Main from "../components/main/Main";
import Article from "../components/article/Article";
import Container from "../components/container/Container";
import H2 from "../components/typography/H2";
import Cards from "../components/cards/Cards";
import ImageComponent from "../components/image/Image";
import CardContent from "../components/cards/card/CardContent";

// Interfaces
import { IMovie } from "../interfaces/IMovie";
import { IPerson } from "../interfaces/IPerson";
import { ITVShow } from "../interfaces/ITVShow";

// Utilities
import { formatDate } from "../utilities/formatDate";

// Hooks
import useMakeQuery from "../hooks/useMakeQuery";

export default function LandingPage() {
  const {
    data: movies,
    isLoading: moviesIsLoading,
    isError: moviesIsError,
  } = useMakeQuery("trending movies", "trending/movie/week");

  const {
    data: people,
    isLoading: peopleIsLoading,
    isError: peopleIsError,
  } = useMakeQuery("trending people", "trending/person/week");

  const {
    data: tvshows,
    isLoading: tvshowsIsLoading,
    isError: tvshowsIsError,
  } = useMakeQuery("trending tvshows", "trending/tv/week");

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
        <Article>
          <Container>
            <H2 heading="trending movies" />
            <Cards
              getID={(item: IMovie) => item.id}
              renderLink={(item) => `/movies/${item.id}`}
              renderItem={(item: IMovie) => (
                <>
                  <ImageComponent
                    src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                    fallback="/images/error_500x750.webp"
                    alt={item.title}
                  />
                  <CardContent
                    heading={item.title}
                    body={formatDate(item.release_date)}
                  />
                </>
              )}
              data={movies.results}
            />
          </Container>
        </Article>

        {/* Trending People */}
        <Article>
          <Container>
            <H2 heading="trending people" />
            <Cards
              getID={(item: IPerson) => item.id}
              renderLink={(item) => `/person/${item.id}`}
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
              data={people.results}
            />
          </Container>
        </Article>

        {/* Trending TV Shows */}
        <Article>
          <Container>
            <H2 heading="trending tv shows" />
            <Cards
              getID={(item: ITVShow) => item.id}
              renderLink={(item) => `/tv/${item.id}`}
              renderItem={(item: ITVShow) => (
                <>
                  <ImageComponent
                    src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                    fallback="/images/error_500x750.webp"
                    alt={item.name}
                  />
                  <CardContent
                    heading={item.name}
                    body={formatDate(item.first_air_date)}
                  />
                </>
              )}
              data={tvshows.results}
            />
          </Container>
        </Article>
      </Main>
    </>
  );
}
