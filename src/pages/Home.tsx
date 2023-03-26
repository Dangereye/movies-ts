// Components
import Main from "../components/main/Main";
import H2 from "../components/typography/H2";

// Interfaces
import { IPage } from "../interfaces/IPage";
import { IMovieMin } from "../interfaces/IMovieMin";
import { IPerson } from "../interfaces/IPerson";
import { ITVShowMin } from "../interfaces/ITVShowMin";
// Hooks
import useMakeQuery from "../hooks/useMakeQuery";
import ArticlePeopleScrollX from "../components/articles/ArticlePeopleScrollX";
import ArticleTvScrollX from "../components/articles/ArticleTvScrollX";
import ArticleMoviesMin from "../components/articles/ArticleMoviesMin";

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
        
        <ArticleMoviesMin variant="scroll-x" name="trending-movies" heading="Trending movies" data={movies?.results}/>

        {/* Trending People */}
        <ArticlePeopleScrollX
          name="trending-people"
          heading="Trending People"
          data={people?.results}
          department
        />

        {/* Trending TV Shows */}
        <ArticleTvScrollX
          name="trending-tv-shows"
          heading="Trending TV Shows"
          data={tvshows?.results}
        />
      </Main>
    </>
  );
}
