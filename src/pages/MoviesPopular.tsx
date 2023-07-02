// React
import { useRef, useEffect, useContext } from 'react';

// Hooks
import useMakeInfiniteQuery from '../hooks/useMakeInfiniteQuery';
import useAppend from '../hooks/useAppendMovie';

// Components
import CardContent from '../components/cards/card/CardContent';
import ImageComponent from '../components/image/Image';
import BodyText from '../components/typography/BodyText';
import MobileSidebarControls from '../components/sidebar/mobile_sidebar_controls/MobileSidebarControls';
import InfiniteCards from '../components/cards/InifinteCards';
import ArticleWithSidebar from '../components/articles/ArticleWithSidebar';
import Loader from '../components/loader/Loader';
import ErrorComponent from '../components/error/Error';
import NoResults from '../components/typography/NoResults';

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
  const title = 'Movies: Popular';
  const name = 'movies-popular';

  const getNextPageParam = (page: IPage<IMovieMin>) => page.page + 1;

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
      <ArticleWithSidebar navigation={moviePages} title={title} name={name}>
        <Loader />
      </ArticleWithSidebar>
    );
  }

  if (isError) {
    return (
      <ArticleWithSidebar navigation={moviePages} title={title} name={name}>
        <ErrorComponent />
      </ArticleWithSidebar>
    );
  }

  if (data.pages[0].total_results === 0) {
    return (
      <ArticleWithSidebar navigation={moviePages} title={title} name={name}>
        <NoResults media='movies' />
      </ArticleWithSidebar>
    );
  }

  return (
    <ArticleWithSidebar navigation={moviePages} title={title} name={name}>
      <MobileSidebarControls />
      <InfiniteCards
        getId={(item) => item.id}
        getLink={(item) => `/movies/${item.id}`}
        renderContent={(item) => (
          <>
            <ImageComponent
              key={item.title}
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
    </ArticleWithSidebar>
  );
}
