// Components
import Header from '../components/header/Header';
import Searchbar from '../components/searchbar/Searchbar';
import HDiv from '../components/typography/HDiv';
import Section from '../components/sections/Section';
import Main from '../components/main/Main';
import ErrorComponent from '../components/error/Error';
import LoaderComponent from '../components/loader/Loader';
import Container from '../components/container/Container';

// Interfaces
import { IPage } from '../interfaces/IPage';
import { IMovieMin } from '../interfaces/IMovieMin';
import { IPerson } from '../interfaces/IPerson';
import { ITVShowMin } from '../interfaces/ITVShowMin';

// Hooks
import useMakeQuery from '../hooks/useMakeQuery';

// Articles
import ArticleMoviesMin from '../components/articles/ArticleMoviesMin';
import ArticlePeople from '../components/articles/ArticlePeople';
import ArticleTvMin from '../components/articles/ArticleTvMin';

export default function LandingPage() {
  const title = 'Ready to be entertained?';
  const heading =
    'Millions of movies, Tv shows and people to discover, explore now.';
  const {
    data: movies,
    isLoading: moviesIsLoading,
    isError: moviesIsError,
  } = useMakeQuery<IPage<IMovieMin>>('trending movies', 'trending/movie/week');

  const {
    data: people,
    isLoading: peopleIsLoading,
    isError: peopleIsError,
  } = useMakeQuery<IPage<IPerson>>('trending people', 'trending/person/week');

  const {
    data: tvshows,
    isLoading: tvshowsIsLoading,
    isError: tvshowsIsError,
  } = useMakeQuery<IPage<ITVShowMin>>('trending tvshows', 'trending/tv/week');

  if (moviesIsLoading || peopleIsLoading || tvshowsIsLoading) {
    return (
      <>
        <Header
          variant='header__center'
          title={title}
          bgImage={movies?.results[0]?.backdrop_path}
        >
          <HDiv variant='heading--h2' heading={heading} />
          <Searchbar fixed />
        </Header>
        <Section>
          <Main>
            <Container>
              <LoaderComponent />
            </Container>
          </Main>
        </Section>
      </>
    );
  }

  if (moviesIsError || peopleIsError || tvshowsIsError) {
    return (
      <>
        <Header
          variant='header__center'
          title={title}
          bgImage={movies?.results[0]?.backdrop_path}
        >
          <HDiv variant='heading--h2' heading={heading} />
          <Searchbar fixed />
        </Header>
        <Section>
          <Main>
            <Container>
              <ErrorComponent />
            </Container>
          </Main>
        </Section>
      </>
    );
  }

  return (
    <>
      <Header
        variant='header__center'
        title={title}
        bgImage={movies?.results[0].backdrop_path}
      >
        <HDiv variant='heading--h2' heading={heading} />
        <Searchbar fixed />
      </Header>
      <Section>
        <Main>
          <ArticleMoviesMin
            variant='scroll-x'
            name='trending-movies'
            heading='Trending movies'
            data={movies?.results}
          />
          <ArticlePeople
            variant='scroll-x'
            name='trending-people'
            heading='Trending people'
            data={people?.results}
            department
          />
          <ArticleTvMin
            variant='scroll-x'
            name='trending-tv-shows'
            heading='Trending TV shows'
            data={tvshows?.results}
          />
        </Main>
      </Section>
    </>
  );
}
