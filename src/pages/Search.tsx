// React
import { useEffect, useContext } from 'react';

// React router
import { useParams } from 'react-router-dom';

// Hooks
import useMakeInfiniteQuery from '../hooks/useMakeInfiniteQuery';
import useAppendSearch from '../hooks/useAppendSearch';

// Interfaces
import { IPage } from '../interfaces/IPage';
import { IMovieMin } from '../interfaces/IMovieMin';
import { ITVShowMin } from '../interfaces/ITVShowMin';
import { IPerson } from '../interfaces/IPerson';

// Context
import { SearchFiltersContext } from '../contexts/SearchFiltersContext';

// Components
import SubNavbar from '../components/sub_navbar/SubNavbar';
import Container from '../components/container/Container';
import Article from '../components/articles/Article';
import BodyText from '../components/typography/BodyText';
import Main from '../components/main/Main';
import InfiniteCards from '../components/cards/InifinteCards';
import ImageComponent from '../components/image/Image';
import CardContent from '../components/cards/card/CardContent';
import Header from '../components/header/Header';
import Layout from '../components/layout/Layout';
import Sidebar from '../components/sidebar/Sidebar';
import LoaderComponent from '../components/loader/Loader';
import ErrorComponent from '../components/error/Error';
import ArticleWithSidebar from '../components/articles/ArticleWithSidebar';

// Data
import { moviePages } from '../data/moviePages';
import { tvPages } from '../data/tvPages';
import { peoplePages } from '../data/peoplePages';

// Utilities
import { formatDate } from '../utilities/formatDate';

export default function Search() {
  const { searchId } = useParams();
  const { state, dispatch } = useContext(SearchFiltersContext);
  const append = useAppendSearch();
  const title = `${state.display.show_media_type} matching: ${searchId}`;

  const moviesGetNextPageParam = (page: IPage<IMovieMin>) => page.page + 1;
  const tvshowsGetNextPageParam = (page: IPage<ITVShowMin>) => page.page + 1;
  const peopleGetNextPageParam = (page: IPage<IPerson>) => page.page + 1;

  const {
    data: movies,
    isError: moviesError,
    isLoading: moviesLoading,
    hasNextPage: moviesHasNextPage,
    fetchNextPage: moviesFetchNextPage,
  } = useMakeInfiniteQuery<IPage<IMovieMin>>(
    'search/movie',
    `&query=${searchId}${append}`,
    moviesGetNextPageParam
  );

  const {
    data: tvshows,
    isError: tvshowsError,
    isLoading: tvshowsLoading,
    hasNextPage: tvshowsHasNextPage,
    fetchNextPage: tvshowsFetchNextPage,
  } = useMakeInfiniteQuery<IPage<ITVShowMin>>(
    'search/tv',
    `&query=${searchId}${append}`,
    tvshowsGetNextPageParam
  );

  const {
    data: people,
    isError: peopleError,
    isLoading: peopleLoading,
    hasNextPage: peopleHasNextPage,
    fetchNextPage: peopleFetchNextPage,
  } = useMakeInfiniteQuery<IPage<IPerson>>(
    'search/person',
    `&query=${searchId}${append}`,
    peopleGetNextPageParam
  );

  useEffect(() => {
    dispatch({
      type: 'SET_FILTERS',
      payload: {
        ...state,
        display: {
          ...state.display,
          results: {
            ...state.display.results,
            movies: movies?.pages[0].total_results,
            tv_shows: tvshows?.pages[0].total_results,
            people: people?.pages[0].total_results,
          },
        },
      },
    });
  }, [movies, tvshows, people]);

  if (moviesLoading || tvshowsLoading || peopleLoading) {
    return (
      <>
        <SubNavbar />
        <Header
          variant='header__min'
          title={`${state.display.show_media_type} matching: ${searchId}`}
        />
        <Article name='Loading'>
          <Container>
            <Layout variant='grid grid--sidebar'>
              <Sidebar />
              <Main>
                <LoaderComponent />
              </Main>
            </Layout>
          </Container>
        </Article>
      </>
    );
  }

  if (moviesError || tvshowsError || peopleError) {
    return (
      <>
        <SubNavbar />
        <Header
          variant='header__min'
          title={`${state.display.show_media_type} matching: ${searchId}`}
        />
        <Article name='Error'>
          <Container>
            <Layout variant='grid grid--sidebar'>
              <Sidebar />
              <Main>
                <ErrorComponent />
              </Main>
            </Layout>
          </Container>
        </Article>
      </>
    );
  }

  if (
    state.display.show_media_type === 'movies' &&
    state.display.results.movies
  ) {
    return (
      <ArticleWithSidebar
        navigation={moviePages}
        title={title}
        name='search-results-movie'
      >
        <InfiniteCards
          getId={(item) => item.id}
          getLink={(item) => `/movies/${item.id}`}
          renderContent={(item) => (
            <>
              <ImageComponent
                src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                fallback='/images/error_500x750.webp'
                alt={item.title}
              />
              <CardContent heading={item.title} vote={item.vote_average}>
                <BodyText text={`${formatDate(item.release_date)}`} />
              </CardContent>
            </>
          )}
          data={movies.pages}
          hasNextPage={moviesHasNextPage}
          fetchNextPage={moviesFetchNextPage}
        />
      </ArticleWithSidebar>
    );
  }

  if (
    state.display.show_media_type === 'tv-shows' &&
    state.display.results.tv_shows
  ) {
    return (
      <ArticleWithSidebar
        navigation={tvPages}
        title={title}
        name='search-results-tv'
      >
        <InfiniteCards
          getId={(item) => item.id}
          getLink={(item) => `/tv/${item.id}`}
          renderContent={(item) => (
            <>
              <ImageComponent
                src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                fallback='/images/error_500x750.webp'
                alt={item.name}
              />
              <CardContent heading={item.name} vote={item.vote_average}>
                <BodyText text={`${formatDate(item.first_air_date)}`} />
              </CardContent>
            </>
          )}
          data={tvshows.pages}
          hasNextPage={tvshowsHasNextPage}
          fetchNextPage={tvshowsFetchNextPage}
        />
      </ArticleWithSidebar>
    );
  }

  if (
    state.display.show_media_type === 'people' &&
    state.display.results.people
  ) {
    return (
      <ArticleWithSidebar
        navigation={peoplePages}
        title={title}
        name='search-results-people'
      >
        <InfiniteCards
          getId={(item) => item.id}
          getLink={(item) => `/people/${item.id}`}
          renderContent={(item) => (
            <>
              <ImageComponent
                src={`https://image.tmdb.org/t/p/w500/${item.profile_path}`}
                fallback='/images/error_500x750.webp'
                alt={item.name}
              />
              <CardContent heading={item.name}>
                <BodyText text={item.known_for_department} />
              </CardContent>
            </>
          )}
          data={people.pages}
          hasNextPage={peopleHasNextPage}
          fetchNextPage={peopleFetchNextPage}
        />
      </ArticleWithSidebar>
    );
  }

  return (
    <>
      <SubNavbar />
      <Header
        variant='header__min'
        title={`${state.display.show_media_type} matching: ${searchId}`}
      />
      <Article name='no results'>
        <Container>
          <Layout variant='grid grid--sidebar'>
            <Sidebar />
            <Main>
              <BodyText text='No items match your query.' />
            </Main>
          </Layout>
        </Container>
      </Article>
    </>
  );
}
