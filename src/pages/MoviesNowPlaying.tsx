// React
import { useContext, useEffect, useRef } from 'react';

// Contexts
import { MovieFiltersContext } from '../contexts/MovieFiltersContext';

// Interfaces
import { IPage } from '../interfaces/IPage';
import { IMovieMin } from '../interfaces/IMovieMin';

// Hooks
import useMakeInfiniteQuery from '../hooks/useMakeInfiniteQuery';
import useAppend from '../hooks/useAppendMovie';

// Utilities
import { formatDate } from '../utilities/formatDate';

// Components
import MobileSidebarControls from '../components/sidebar/mobile_sidebar_controls/MobileSidebarControls';
import InfiniteCards from '../components/cards/InifinteCards';
import ImageComponent from '../components/image/Image';
import CardContent from '../components/cards/card/CardContent';
import BodyText from '../components/typography/BodyText';
import Loader from '../components/loader/Loader';
import ErrorComponent from '../components/error/Error';
import NoResults from '../components/typography/NoResults';

// Templates
import PageWithSidebar from '../components/page_templates/PageWithSidebar';

// Data
import { moviePages } from '../data/moviePages';

export default function MoviesNowPlaying() {
  const { state, dispatch } = useContext(MovieFiltersContext);
  const { append } = useAppend();
  const initial = useRef(false);
  const title = 'Movies: Theatrical';
  const name = 'movies-theatrical';

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
        type: 'SET_DEFAULT_NOW_PLAYING',
        payload: { ...state },
      });
    }
  });

  if (isLoading) {
    return (
      <PageWithSidebar navigation={moviePages} title={title} name={name}>
        <Loader />
      </PageWithSidebar>
    );
  }

  if (isError) {
    return (
      <PageWithSidebar navigation={moviePages} title={title} name={name}>
        <ErrorComponent />
      </PageWithSidebar>
    );
  }

  if (data.pages[0].total_results === 0) {
    return (
      <PageWithSidebar navigation={moviePages} title={title} name={name}>
        <NoResults media='movies' />
      </PageWithSidebar>
    );
  }

  return (
    <PageWithSidebar navigation={moviePages} title={title} name={name}>
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
