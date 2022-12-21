// React Query
import { useQuery } from "@tanstack/react-query";

import Main from "../components/main/Main";
import Article from "../components/article/Article";
import Container from "../components/container/Container";
import H2 from "../components/typography/H2";
import Cards from "../components/cards/Cards";
import ImageComponent from "../components/image/Image";
import CardContent from "../components/cards/card/CardContent";

// Interfaces
import { IMovie } from "../interfaces/IMovie";

// Utilities
import { formatDate } from "../utilities/formatDate";
import { IPerson } from "../interfaces/IPerson";
import { ITVShow } from "../interfaces/ITVShow";

const fetchData = async (endpoint: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/${endpoint}?api_key=2f965fedbcdec55779f7e2e60eb62e59`
  );
  return res.json();
};

export default function LandingPage() {
  const {
    data: movies,
    isLoading: moviesIsLoading,
    isError: moviesIsError,
  } = useQuery({
    queryKey: ["trending movies"],
    queryFn: () => fetchData("trending/movie/week"),
  });

  const {
    data: people,
    isLoading: peopleIsLoading,
    isError: peopleIsError,
  } = useQuery({
    queryKey: ["trending people"],
    queryFn: () => fetchData("trending/person/week"),
  });

  const {
    data: tvshows,
    isLoading: tvshowsIsLoading,
    isError: tvshowsIsError,
  } = useQuery({
    queryKey: ["trending tv shows"],
    queryFn: () => fetchData("trending/tv/week"),
  });

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
