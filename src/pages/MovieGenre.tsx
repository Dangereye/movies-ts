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
import LoaderComponent from '../components/loader/Loader';
import ErrorComponent from '../components/error/Error';
import NoResults from '../components/typography/NoResults';
import CardsInfiniteScroll from '../components/cards/CardsInfiniteScroll';

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
        name='error'
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
      <CardsInfiniteScroll
        data={data.pages}
        getId={(item) => item.id}
        getLink={(item) => `/movies/${item.id}`}
        getHeading={(item) => item.title}
        getImage={(item) => item.poster_path}
        getVotes={(item) => item.vote_average}
        getBodyText={(item) => `${formatDate(item.release_date)}`}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
      />
    </Page>
  );
}
