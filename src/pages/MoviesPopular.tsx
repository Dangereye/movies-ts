// React
import { useRef, useEffect, useContext } from 'react';

// Hooks
import useMakeInfiniteQuery from '../hooks/useMakeInfiniteQuery';
import useAppend from '../hooks/useAppendMovie';

// Components
import LoaderComponent from '../components/loader/Loader';
import ErrorComponent from '../components/error/Error';
import CardsInfiniteScroll from '../components/cards/CardsInfiniteScroll';
import NoResults from '../components/typography/NoResults';

// Template
import PageWithSidebar from '../components/page_templates/PageWithSidebar';

// Context
import { MovieFiltersContext } from '../contexts/MovieFiltersContext';

// Interfaces
import { IPage } from '../interfaces/IPage';
import { IMovieMin } from '../interfaces/IMovieMin';

// Utilities
import { formatDate } from '../utilities/formatDate';

// Data
import { moviePages } from '../data/moviePages';

export default function MoviesPopular() {
  const { state, dispatch } = useContext(MovieFiltersContext);
  const { append } = useAppend();
  const initial = useRef(false);
  const leadTitle = 'Movies';
  const title = 'popular';
  const name = 'movies-popular';

  const getNextPageParam = (page: IPage<IMovieMin>) =>
    page.page < page.total_pages ? page.page + 1 : null;

  const { data, isError, isLoading, hasNextPage, fetchNextPage } =
    useMakeInfiniteQuery<IPage<IMovieMin>>(
      'discover/movie',
      append,
      getNextPageParam
    );

  useEffect(() => {
    if (!initial.current) {
      initial.current = true;
      dispatch({
        type: 'SET_DEFAULT_POPULAR',
        payload: { ...state },
      });
    }
  });

  if (isLoading) {
    return (
      <PageWithSidebar
        navigation={moviePages}
        leadTitle={leadTitle}
        title={title}
        name={name}
      >
        <LoaderComponent />
      </PageWithSidebar>
    );
  }
  if (isError) {
    return (
      <PageWithSidebar
        navigation={moviePages}
        leadTitle={leadTitle}
        title={title}
        name='error'
      >
        <ErrorComponent />
      </PageWithSidebar>
    );
  }

  if (data.pages[0].total_results === 0) {
    return (
      <PageWithSidebar
        navigation={moviePages}
        leadTitle={leadTitle}
        title={title}
        name={name}
      >
        <NoResults media='movies' />
      </PageWithSidebar>
    );
  }

  return (
    <PageWithSidebar
      navigation={moviePages}
      leadTitle={leadTitle}
      title={title}
      name={name}
    >
      <CardsInfiniteScroll
        data={data.pages}
        getId={(item) => item.id}
        getLink={(item) => `/movies/${item.id}`}
        getHeading={(item) => item.title}
        getImage={(item) => item.poster_path}
        poster_sizes='w300'
        getVotes={(item) => item.vote_average}
        getBodyText={(item) => `${formatDate(item.release_date)}`}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
      />
    </PageWithSidebar>
  );
}
