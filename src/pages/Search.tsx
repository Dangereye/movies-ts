import { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

// Hooks
import useMakeInfiniteQuery from '../hooks/useMakeInfiniteQuery';

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
import H2 from '../components/typography/H2';
import Main from '../components/main/Main';
import InfiniteCards from '../components/cards/InifinteCards';
import ImageComponent from '../components/image/Image';
import CardContent from '../components/cards/card/CardContent';
import Header from '../components/header/Header';
import Layout from '../components/layout/Layout';
import Sidebar from '../components/sidebar/Sidebar';

// Data
import { moviePages } from '../data/moviePages';
import { tvPages } from '../data/tvPages';
import { peoplePages } from '../data/peoplePages';

// Utilities
import { formatDate } from '../utilities/formatDate';
import Navigation from '../components/navigation/Navigation';

export default function Search() {
  const { searchId } = useParams();
  const { state, dispatch } = useContext(SearchFiltersContext);

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
    `&query=${searchId}`,
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
    `&query=${searchId}`,
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
    `&query=${searchId}`,
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
    return <H2 heading='Loading' />;
  }

  if (moviesError || tvshowsError || peopleError) {
    return <H2 heading='Error' />;
  }

  if (state.display.show_media_type === 'movies') {
    return (
      <>
        <SubNavbar>
          <Navigation
            data={moviePages}
            getId={(item) => item.name}
            getLink={(item) => item.link}
            renderItem={(item) => item.name}
            variant='horizontal'
          />
        </SubNavbar>
        <Header
          variant='header__min'
          title={`${state.display.show_media_type} matching: ${searchId}`}
        />
        <Main>
          <Article name='movie-search-results'>
            <Container>
              <Layout variant='grid grid--sidebar'>
                <Sidebar />
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
                      <CardContent
                        heading={item.title}
                        vote={item.vote_average}
                      >
                        <BodyText text={`${formatDate(item.release_date)}`} />
                      </CardContent>
                    </>
                  )}
                  data={movies.pages}
                  hasNextPage={moviesHasNextPage}
                  fetchNextPage={moviesFetchNextPage}
                />
              </Layout>
            </Container>
          </Article>
        </Main>
      </>
    );
  }

  if (state.display.show_media_type === 'tv-shows') {
    return (
      <>
        <SubNavbar>
          <Navigation
            data={tvPages}
            getId={(item) => item.name}
            getLink={(item) => item.link}
            renderItem={(item) => item.name}
            variant='horizontal'
          />
        </SubNavbar>
        <Header
          variant='header__min'
          title={`${state.display.show_media_type} matching: ${searchId}`}
        />
        <Main>
          <Article name='tv-shows-search-results'>
            <Container>
              <Layout variant='grid grid--sidebar'>
                <Sidebar />
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
              </Layout>
            </Container>
          </Article>
        </Main>
      </>
    );
  }

  return (
    <>
      <SubNavbar>
        <Navigation
          data={peoplePages}
          getId={(item) => item.name}
          getLink={(item) => item.link}
          renderItem={(item) => item.name}
          variant='horizontal'
        />
      </SubNavbar>
      <Header
        variant='header__min'
        title={`${state.display.show_media_type} matching: ${searchId}`}
      />
      <Main>
        <Article name='people-search-results'>
          <Container>
            <Layout variant='grid grid--sidebar'>
              <Sidebar />
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
            </Layout>
          </Container>
        </Article>
      </Main>
    </>
  );
}
