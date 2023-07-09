// React
import { useEffect, useState, useRef, useContext } from 'react';

// React router
import { useParams } from 'react-router-dom';

// Hooks
import useMakeInfiniteQuery from '../hooks/useMakeInfiniteQuery';
import useCreateGenres from '../hooks/useCreateGenres';
import useAppend from '../hooks/useAppendMovie';

// Context
import { MovieFiltersContext } from '../contexts/MovieFiltersContext';

// Components
import CardContent from '../components/cards/card/CardContent';
import ImageComponent from '../components/image/Image';
import BodyText from '../components/typography/BodyText';
import InfiniteCards from '../components/cards/InifinteCards';
import ErrorComponent from '../components/error/Error';
import LoaderComponent from '../components/loader/Loader';
import NoResults from '../components/typography/NoResults';

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
  const { append } = useAppend();
  const { genreId } = useParams();
  const initial = useRef(false);
  const title = `${genre} movies`;
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
      <PageWithSidebar navigation={moviePages} title={title} name={name}>
        <LoaderComponent />
      </PageWithSidebar>
    );
  }

  if (isError) {
    return (
      <PageWithSidebar navigation={moviePages} title={title} name={name}>
        <ErrorComponent />
      </PageWithSidebar>
    );
  }

  if (data.pages[0].total_results === 0) {
    return (
      <PageWithSidebar navigation={moviePages} title={title} name={name}>
        <NoResults media='movies' />
      </PageWithSidebar>
    );
  }

  return (
    <PageWithSidebar navigation={moviePages} title={title} name={name}>
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
        data={data.pages}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
      />
    </PageWithSidebar>
  );
}
