// React
import { useContext, useEffect, useState } from 'react';

// React router
import { useParams } from 'react-router-dom';

// Context
import { AppContext } from '../contexts/AppContext';

// Hooks
import useMakeInfiniteQuery from '../hooks/useMakeInfiniteQuery';
import useCreateGenres from '../hooks/useCreateGenres';

// Components
import CardContent from '../components/cards/card/CardContent';
import ImageComponent from '../components/image/Image';
import BodyText from '../components/typography/BodyText';
import InfiniteCards from '../components/cards/InifinteCards';
import ErrorComponent from '../components/error/Error';
import LoaderComponent from '../components/loader/Loader';
import NoResults from '../components/typography/NoResults';

// Templates
import Page from '../components/page_templates/Page';

// Interfaces
import { IPage } from '../interfaces/IPage';
import { IMovieMin } from '../interfaces/IMovieMin';

// Data
import { moviePages } from '../data/moviePages';

// Utilities
import { formatDate } from '../utilities/formatDate';

export default function MovieGenre() {
  const { state } = useContext(AppContext);
  const [genre, setGenre] = useState('');
  const { genreId } = useParams();
  const leadTitle = 'Movies';
  const title = `${genre}`;
  const name = 'movies-by-genre';

  const GetNextPageParam = (page: IPage<IMovieMin>) =>
    page.page < page.total_pages ? page.page + 1 : null;
  const { data, isError, isLoading, hasNextPage, fetchNextPage } =
    useMakeInfiniteQuery<IPage<IMovieMin>>(
      'discover/movie',
      `&sort_by=popularity.desc&with_genres=${genreId}&region=${state.region.value}&include_adult=${state.adult.active}`,
      GetNextPageParam
    );

  const genres = useCreateGenres('movie-genres', 'genre/movie/list');

  useEffect(() => {
    genres?.find((g) => {
      if (`${g.id}` === genreId) {
        setGenre(g.name);
      }
    });
  }, [genreId, genres, genre]);

  if (isLoading) {
    return (
      <Page
        navigation={moviePages}
        leadTitle={leadTitle}
        title={title}
        name={name}
      >
        <LoaderComponent />
      </Page>
    );
  }

  if (isError) {
    return (
      <Page
        navigation={moviePages}
        leadTitle={leadTitle}
        title={title}
        name='article__error'
      >
        <ErrorComponent />
      </Page>
    );
  }

  if (data.pages[0].total_results === 0) {
    return (
      <Page
        navigation={moviePages}
        leadTitle={leadTitle}
        title={title}
        name={name}
      >
        <NoResults media='movies' />
      </Page>
    );
  }

  return (
    <Page
      navigation={moviePages}
      leadTitle={leadTitle}
      title={title}
      name={name}
    >
      <InfiniteCards
        getId={(item) => item.id}
        getLink={(item) => `/movies/${item.id}`}
        renderContent={(item) => (
          <>
            <ImageComponent
              src={
                item.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${item.poster_path}`
                  : '/images/error_500x750.webp'
              }
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
    </Page>
  );
}
