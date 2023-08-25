// React
import { useContext, useEffect, useState, useRef } from 'react';

// React router
import { useParams } from 'react-router-dom';

// Context
import { MovieFiltersContext } from '../contexts/MovieFiltersContext';

// Hooks
import useMakeInfiniteQuery from '../hooks/useMakeInfiniteQuery';
import useAppend from '../hooks/useAppendMovie';
import useCreateGenres from '../hooks/useCreateGenres';

// Components
import LoaderComponent from '../components/loader/Loader';
import ErrorComponent from '../components/error/Error';
import NoResults from '../components/typography/NoResults';
import CardsInfiniteScroll from '../components/cards/CardsInfiniteScroll';

// Templates
import PageWithSidebar from '../components/page_templates/PageWithSidebar';

// Interfaces
import { IPage } from '../interfaces/IPage';
import { IMovieMin } from '../interfaces/IMovieMin';

// Data
import { moviePages } from '../data/moviePages';

// Utilities
import { formatDate } from '../utilities/formatDate';

export default function MovieGenre() {
  const { state, dispatch } = useContext(MovieFiltersContext);
  const [genre, setGenre] = useState('');
  const { genreId } = useParams();
  const { append } = useAppend();
  const initial = useRef(false);
  const leadTitle = 'Movies';
  const title = `${genre}`;
  const name = 'movies-by-genre';

  const GetNextPageParam = (page: IPage<IMovieMin>) =>
    page.page < page.total_pages ? page.page + 1 : null;
  const { data, isError, isLoading, hasNextPage, fetchNextPage } =
    useMakeInfiniteQuery<IPage<IMovieMin>>(
      'discover/movie',
      append,
      GetNextPageParam
    );

  const genres = useCreateGenres('movie-genres', 'genre/movie/list');

  useEffect(() => {
    if (!initial.current && genreId) {
      initial.current = true;
      dispatch({
        type: 'SET_FILTERS',
        payload: {
          ...state,
          genres: { ...state.genres, types: [+genreId] },
        },
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
        navigation={moviePages}
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
        navigation={moviePages}
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
        navigation={moviePages}
        leadTitle={leadTitle}
        title={title}
        name={name}
      >
        <NoResults media='movies' />
      </PageWithSidebar>
    );
  }

  return (
    <PageWithSidebar
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
        poster_sizes='w300'
        getVotes={(item) => item.vote_average}
        getBodyText={(item) => `${formatDate(item.release_date)}`}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
      />
    </PageWithSidebar>
  );
}
