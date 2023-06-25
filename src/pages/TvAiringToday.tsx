import { useContext, useEffect, useRef } from 'react';

// Hooks
import useMakeInfiniteQuery from '../hooks/useMakeInfiniteQuery';
import useAppendTv from '../hooks/useAppendTv';

// Context
import { TvFiltersContext } from '../contexts/TvFiltersContext';

// Components
import MobileSidebarControls from '../components/sidebar/mobile_sidebar_controls/MobileSidebarControls';
import InfiniteCards from '../components/cards/InifinteCards';
import ImageComponent from '../components/image/Image';
import CardContent from '../components/cards/card/CardContent';
import BodyText from '../components/typography/BodyText';
import TVShowsWithSidebar from '../components/page_templates/TVShowsWithSidebar';
import Loader from '../components/loader/Loader';

// Utilities
import { formatDate } from '../utilities/formatDate';

// Interfaces
import { IPage } from '../interfaces/IPage';
import { ITVShowMin } from '../interfaces/ITVShowMin';

export default function TvAiringToday() {
  const getNextPageParam = (page: IPage<ITVShowMin>) => page.page + 1;
  const { state, dispatch } = useContext(TvFiltersContext);
  const { append } = useAppendTv();
  const initial = useRef(false);
  const title = 'TV Shows airing today';
  const name = 'tv-shows-airing-today';

  const {
    data: tvQueries,
    isError,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useMakeInfiniteQuery<IPage<ITVShowMin>>(
    'discover/tv',
    append,
    getNextPageParam
  );

  useEffect(() => {
    if (!initial.current) {
      initial.current = true;
      dispatch({
        type: 'SET_DEFAULT_AIRING_TODAY',
        payload: { ...state },
      });
    }
  });

  if (isLoading) {
    return (
      <TVShowsWithSidebar title={title} name={name}>
        <Loader />
      </TVShowsWithSidebar>
    );
  }

  if (isError) {
    return (
      <TVShowsWithSidebar title={title} name={name}>
        <BodyText text='Oops! Something went wrong.' />
      </TVShowsWithSidebar>
    );
  }

  if (tvQueries.pages[0].total_results === 0) {
    return (
      <TVShowsWithSidebar title={title} name={name}>
        <BodyText text='No items were found that match your query.' />
      </TVShowsWithSidebar>
    );
  }

  return (
    <TVShowsWithSidebar title={title} name={name}>
      <MobileSidebarControls />
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
        data={tvQueries.pages}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
      />
    </TVShowsWithSidebar>
  );
}
