import { useContext, useEffect, useRef } from 'react';

// Context
import { MovieFiltersContext } from '../contexts/MovieFiltersContext';

// Interfaces
import { IPage } from '../interfaces/IPage';
import { IMovieMin } from '../interfaces/IMovieMin';

// Hooks
import useAppend from '../hooks/useAppendMovie';
import useMakeInfiniteQuery from '../hooks/useMakeInfiniteQuery';

// Components
import MobileSidebarControls from '../components/sidebar/mobile_sidebar_filters_buttons/MobileSidebarFiltersButtons';
import InfiniteCards from '../components/cards/InifinteCards';
import ImageComponent from '../components/image/Image';
import CardContent from '../components/cards/card/CardContent';
import BodyText from '../components/typography/BodyText';
import LoaderComponent from '../components/loader/Loader';
import ErrorComponent from '../components/error/Error';
import NoResults from '../components/typography/NoResults';

// Template
import PageWithSidebar from '../components/page_templates/PageWithSidebar';

// Data
import { moviePages } from '../data/moviePages';

// Utilities
import { formatDate } from '../utilities/formatDate';

export default function MoviesUpcoming() {
  const { state, dispatch } = useContext(MovieFiltersContext);
  const { append } = useAppend();
  const initial = useRef(false);
  const leadTitle = 'Movies';
  const title = 'Upcoming releases';
  const name = 'movies-upcoming';

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
        type: 'SET_DEFAULT_UPCOMING',
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
        name='article__error'
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
      <MobileSidebarControls />
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
        data={data.pages}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
      />
    </PageWithSidebar>
  );
}
