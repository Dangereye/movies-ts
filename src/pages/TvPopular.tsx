// React
import { useEffect, useContext, useRef } from 'react';

// Hooks
import useMakeInfiniteQuery from '../hooks/useMakeInfiniteQuery';
import useAppendTv from '../hooks/useAppendTv';

// Context
import { TvFiltersContext } from '../contexts/TvFiltersContext';

// Interfaces
import { IPage } from '../interfaces/IPage';
import { ITVShowMin } from '../interfaces/ITVShowMin';

// Components
import LoaderComponent from '../components/loader/Loader';
import ErrorComponent from '../components/error/Error';
import CardsInfiniteScroll from '../components/cards/CardsInfiniteScroll';
import NoResults from '../components/typography/NoResults';

// Templates
import PageWithSidebar from '../components/page_templates/PageWithSidebar';

// Data
import { tvPages } from '../data/tvPages';

// Utilities
import { formatDate } from '../utilities/formatDate';

export default function TvPopular() {
  const { state, dispatch } = useContext(TvFiltersContext);
  const { append } = useAppendTv();

  const getNextPageParam = (page: IPage<ITVShowMin>) =>
    page.page < page.total_pages ? page.page + 1 : null;

  const initial = useRef(false);
  const leadTitle = 'Tv shows';
  const title = 'Popular';
  const name = 'tv-shows-popular';

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
        type: 'SET_DEFAULT_POPULAR',
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
        name='error'
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
      <CardsInfiniteScroll
        data={data.pages}
        getId={(item) => item.id}
        getLink={(item) => `/tv/${item.id}`}
        getHeading={(item) => item.name}
        getImage={(item) => item.poster_path}
        getVotes={(item) => item.vote_average}
        getBodyText={(item) => `${formatDate(item.first_air_date)}`}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
      />
    </PageWithSidebar>
  );
}
