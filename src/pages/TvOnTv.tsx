// React
import { useContext, useEffect, useRef } from 'react';

// Hooks
import useMakeInfiniteQuery from '../hooks/useMakeInfiniteQuery';
import useAppendTv from '../hooks/useAppendTv';

// Context
import { TvFiltersContext } from '../contexts/TvFiltersContext';

// Components
import MobileSidebarControls from '../components/sidebar/mobile_sidebar_controls/MobileSidebarControls';
import InfiniteCards from '../components/cards/InifinteCards';
import ImageComponent from '../components/images/Image';
import CardContent from '../components/cards/card/CardContent';
import BodyText from '../components/typography/BodyText';
import LoaderComponent from '../components/loader/Loader';
import ErrorComponent from '../components/error/Error';
import NoResults from '../components/typography/NoResults';

// Templates
import PageWithSidebar from '../components/page_templates/PageWithSidebar';

// Utilities
import { formatDate } from '../utilities/formatDate';

// Interfaces
import { IPage } from '../interfaces/IPage';
import { ITVShowMin } from '../interfaces/ITVShowMin';

// Data
import { tvPages } from '../data/tvPages';

export default function TvOnTv() {
  const { state, dispatch } = useContext(TvFiltersContext);
  const { append } = useAppendTv();

  const getNextPageParam = (page: IPage<ITVShowMin>) =>
    page.page < page.total_pages ? page.page + 1 : null;

  const initial = useRef(false);
  const leadTitle = 'Tv shows';
  const title = 'Next 7 days';
  const name = 'tv-shows-next-7-days';

  const { data, isError, isLoading, hasNextPage, fetchNextPage } =
    useMakeInfiniteQuery<IPage<ITVShowMin>>(
      'discover/tv',
      append,
      getNextPageParam
    );

  useEffect(() => {
    if (!initial.current) {
      initial.current = true;
      dispatch({
        type: 'SET_DEFAULT_NEXT_7_DAYS',
        payload: { ...state },
      });
    }
  });

  if (isLoading) {
    return (
      <PageWithSidebar
        navigation={tvPages}
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
        navigation={tvPages}
        leadTitle={leadTitle}
        title={title}
        name={name}
      >
        <ErrorComponent />
      </PageWithSidebar>
    );
  }

  if (data.pages[0].total_results === 0) {
    return (
      <PageWithSidebar
        navigation={tvPages}
        leadTitle={leadTitle}
        title={title}
        name={name}
      >
        <NoResults media='Tv shows' />
      </PageWithSidebar>
    );
  }

  return (
    <PageWithSidebar
      navigation={tvPages}
      leadTitle={leadTitle}
      title={title}
      name={name}
    >
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
        data={data.pages}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
      />
    </PageWithSidebar>
  );
}
