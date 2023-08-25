// React
import { useContext, useEffect, useState, useRef } from 'react';

// React router
import { useParams } from 'react-router-dom';

// Context
import { TvFiltersContext } from '../contexts/TvFiltersContext';

// Interfaces
import { IPage } from '../interfaces/IPage';
import { ITVShowMin } from '../interfaces/ITVShowMin';

// Hooks
import useMakeInfiniteQuery from '../hooks/useMakeInfiniteQuery';
import useAppendTv from '../hooks/useAppendTv';
import useCreateGenres from '../hooks/useCreateGenres';

// Components
import LoaderComponent from '../components/loader/Loader';
import ErrorComponent from '../components/error/Error';
import NoResults from '../components/typography/NoResults';
import CardsInfiniteScroll from '../components/cards/CardsInfiniteScroll';

// Templates
import PageWithSidebar from '../components/page_templates/PageWithSidebar';

// Data
import { tvPages } from '../data/tvPages';

// Utilities
import { formatDate } from '../utilities/formatDate';

export default function TvGenre() {
  const { state, dispatch } = useContext(TvFiltersContext);
  const [genre, setGenre] = useState('');
  const { genreId } = useParams();
  const { append } = useAppendTv();
  const initial = useRef(false);
  const leadTitle = 'TV shows';
  const title = genre;
  const name = 'tv-shows-by-genre';

  const GetNextPageParam = (page: IPage<ITVShowMin>) =>
    page.page < page.total_pages ? page.page + 1 : null;
  const { data, isError, isLoading, hasNextPage, fetchNextPage } =
    useMakeInfiniteQuery<IPage<ITVShowMin>>(
      'discover/tv',
      append,
      GetNextPageParam
    );

  const genres = useCreateGenres('tv-genres', 'genre/tv/list');

  useEffect(() => {
    if (!initial.current && genreId) {
      initial.current = true;
      dispatch({
        type: 'SET_FILTERS',
        payload: { ...state, genres: { ...state.genres, types: [+genreId] } },
      });
    }
  });

  useEffect(() => {
    genres?.find((g) => {
      if (`${g.id}` === genreId) {
        setGenre(g.name);
      }
      return null;
    });
  }, [genreId, genres, genre]);

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
        poster_sizes='w300'
        getVotes={(item) => item.vote_average}
        getBodyText={(item) => `${formatDate(item.first_air_date)}`}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
      />
    </PageWithSidebar>
  );
}
