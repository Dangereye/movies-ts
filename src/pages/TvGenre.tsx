// React
import { useContext, useEffect, useRef, useState } from 'react';

// React router
import { useParams } from 'react-router-dom';

// Contexts
import { TvFiltersContext } from '../contexts/TvFiltersContext';

// Interfaces
import { IPage } from '../interfaces/IPage';
import { ITVShowMin } from '../interfaces/ITVShowMin';

// Hooks
import useAppendTv from '../hooks/useAppendTv';
import useMakeInfiniteQuery from '../hooks/useMakeInfiniteQuery';
import useCreateGenres from '../hooks/useCreateGenres';

// Components
import LoaderComponent from '../components/loader/Loader';
import ErrorComponent from '../components/error/Error';
import NoResults from '../components/typography/NoResults';
import InfiniteCards from '../components/cards/InifinteCards';
import ImageComponent from '../components/image/Image';
import CardContent from '../components/cards/card/CardContent';
import BodyText from '../components/typography/BodyText';

// Templates
import PageWithSidebar from '../components/page_templates/PageWithSidebar';

// Data
import { tvPages } from '../data/tvPages';

// Utilities
import { formatDate } from '../utilities/formatDate';

export default function TvGenre() {
  const { state, dispatch } = useContext(TvFiltersContext);
  const [genre, setGenre] = useState('');
  const { append } = useAppendTv();
  const { genreId } = useParams();

  const initial = useRef(false);
  const title = `${genre} tv shows`;
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
    genres?.find((g) => {
      if (`${g.id}` === genreId) {
        setGenre(g.name);
      }
    });
  }, [genreId, genres, genre]);

  useEffect(() => {
    if (!initial.current) {
      initial.current = true;
      dispatch({
        type: 'SET_DEFAULT_GENRE',
        payload: {
          ...state,
          genres: { ...state.genres, types: genreId ? [+genreId] : [] },
        },
      });
    }
  });
  if (isLoading) {
    return (
      <PageWithSidebar navigation={tvPages} title={title} name={name}>
        <LoaderComponent />
      </PageWithSidebar>
    );
  }

  if (isError) {
    return (
      <PageWithSidebar navigation={tvPages} title={title} name={name}>
        <ErrorComponent />
      </PageWithSidebar>
    );
  }

  if (data.pages[0].total_results === 0) {
    return (
      <PageWithSidebar navigation={tvPages} title={title} name={name}>
        <NoResults media='movies' />
      </PageWithSidebar>
    );
  }

  return (
    <PageWithSidebar navigation={tvPages} title={title} name={name}>
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
