import { useContext, useEffect, useRef } from 'react';

// Context
import { MovieFiltersContext } from '../contexts/MovieFiltersContext';

// Hooks
import useAppend from '../hooks/useAppendMovie';
import useMakeInfiniteQuery from '../hooks/useMakeInfiniteQuery';

// Interfaces
import { IPage } from '../interfaces/IPage';
import { IMovieMin } from '../interfaces/IMovieMin';

// Components
import MobileSidebarControls from '../components/sidebar/mobile_sidebar_controls/MobileSidebarControls';
import InfiniteCards from '../components/cards/InifinteCards';
import ImageComponent from '../components/image/Image';
import CardContent from '../components/cards/card/CardContent';
import BodyText from '../components/typography/BodyText';

// Utilites
import { formatDate } from '../utilities/formatDate';
import MoviesWithSidebar from '../components/page_templates/MoviesWithSidebar';
import Loader from '../components/loader/Loader';

export default function MoviesTopRated() {
  const { state, dispatch } = useContext(MovieFiltersContext);
  const { append } = useAppend();
  const initial = useRef(false);
  const title = 'Top rated movies';
  const name = 'top-rated-movies';

  const getNextPageParam = (page: IPage<IMovieMin>) => page.page + 1;

  const {
    data: movieQueries,
    isError,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useMakeInfiniteQuery<IPage<IMovieMin>>(
    'discover/movie',
    append,
    getNextPageParam
  );

  useEffect(() => {
    if (!initial.current) {
      initial.current = true;
      dispatch({
        type: 'SET_DEFAULT_TOP_RATED',
        payload: { ...state },
      });
    }
  });

  if (isLoading) {
    return (
      <MoviesWithSidebar title={title} name={name}>
        <Loader />
      </MoviesWithSidebar>
    );
  }

  if (isError) {
    return (
      <MoviesWithSidebar title={title} name={name}>
        <BodyText text='Oops! Something went wrong.' />
      </MoviesWithSidebar>
    );
  }

  if (movieQueries.pages[0].total_results === 0) {
    return (
      <MoviesWithSidebar title={title} name={name}>
        <BodyText text='No items were found that match your query.' />
      </MoviesWithSidebar>
    );
  }

  return (
    <MoviesWithSidebar title={title} name={name}>
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
        data={movieQueries.pages}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
      />
    </MoviesWithSidebar>
  );
}
