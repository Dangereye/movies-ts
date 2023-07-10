// React
import { useContext, useEffect, useState } from 'react';

// React router
import { useParams } from 'react-router-dom';

// Context
import { AppContext } from '../contexts/AppContext';

// Interfaces
import { IPage } from '../interfaces/IPage';
import { ITVShowMin } from '../interfaces/ITVShowMin';

// Hooks
import useMakeInfiniteQuery from '../hooks/useMakeInfiniteQuery';
import useCreateGenres from '../hooks/useCreateGenres';

// Components
import LoaderComponent from '../components/loader/Loader';
import ErrorComponent from '../components/error/Error';
import NoResults from '../components/typography/NoResults';
import InfiniteCards from '../components/cards/InifinteCards';
import ImageComponent from '../components/images/Image';
import CardContent from '../components/cards/card/CardContent';
import BodyText from '../components/typography/BodyText';

// Templates
import Page from '../components/page_templates/Page';

// Data
import { tvPages } from '../data/tvPages';

// Utilities
import { formatDate } from '../utilities/formatDate';

export default function TvGenre() {
  const { state } = useContext(AppContext);
  const [genre, setGenre] = useState('');
  const { genreId } = useParams();
  const title = `${genre} tv shows`;
  const name = 'tv-shows-by-genre';

  const GetNextPageParam = (page: IPage<ITVShowMin>) =>
    page.page < page.total_pages ? page.page + 1 : null;
  const { data, isError, isLoading, hasNextPage, fetchNextPage } =
    useMakeInfiniteQuery<IPage<ITVShowMin>>(
      'discover/tv',
      `&sort_by=popularity.desc&with_genres=${genreId}&region=${state.region.value}&vote_count.gte=100&include_adult=${state.adult.active}`,
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

  if (isLoading) {
    return (
      <Page navigation={tvPages} title={title} name={name}>
        <LoaderComponent />
      </Page>
    );
  }

  if (isError) {
    return (
      <Page navigation={tvPages} title={title} name={name}>
        <ErrorComponent />
      </Page>
    );
  }

  if (data.pages[0].total_results === 0) {
    return (
      <Page navigation={tvPages} title={title} name={name}>
        <NoResults media='Tv shows' />
      </Page>
    );
  }

  return (
    <Page navigation={tvPages} title={title} name={name}>
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
    </Page>
  );
}
