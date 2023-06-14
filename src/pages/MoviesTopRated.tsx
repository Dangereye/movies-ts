import { useContext, useEffect, useRef } from 'react';

// Context
import { MovieFiltersContext } from '../contexts/MovieFiltersContext';

// Hooks
import useAppend from '../hooks/useAppendMovie';
import useMakeInfiniteQuery from '../hooks/useMakeInfiniteQuery';

// Interfaces
import { IPage } from '../interfaces/IPage';
import { IMovieMin } from '../interfaces/IMovieMin';

// Components
import H2 from '../components/typography/H2';
import SubNavbar from '../components/sub_navbar/SubNavbar';
import Navigation from '../components/navigation/Navigation';
import Header from '../components/header/Header';
import Article from '../components/articles/Article';
import Container from '../components/container/Container';
import Layout from '../components/layout/Layout';
import Sidebar from '../components/sidebar/Sidebar';
import Main from '../components/main/Main';
import MobileSidebarControls from '../components/sidebar/mobile_sidebar_controls/MobileSidebarControls';
import InfiniteCards from '../components/cards/InifinteCards';
import ImageComponent from '../components/image/Image';
import CardContent from '../components/cards/card/CardContent';
import BodyText from '../components/typography/BodyText';

// Data
import { moviePages } from '../data/moviePages';

// Utilites
import { formatDate } from '../utilities/formatDate';

export default function MoviesTopRated() {
  const { state, dispatch } = useContext(MovieFiltersContext);
  const { append } = useAppend();
  const initial = useRef(false);

  const getNextPageParam = (page: IPage<IMovieMin>) => page.page + 1;

  const {
    data: movieQueries,
    isError,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useMakeInfiniteQuery<IPage<IMovieMin>>(
    'discover/movie',
    append,
    getNextPageParam
  );

  useEffect(() => {
    if (!initial.current) {
      initial.current = true;
      dispatch({
        type: 'SET_DEFAULT_TOP_RATED',
        payload: { ...state },
      });
    }
  });

  if (isLoading) {
    return <H2 heading='Loading' />;
  }

  if (isError) {
    return <H2 heading='Error' />;
  }

  return (
    <>
      <SubNavbar>
        <Navigation
          data={moviePages}
          getId={(item) => item.name}
          getLink={(item) => item.link}
          renderItem={(item) => item.name}
          variant='horizontal'
        />
      </SubNavbar>
      <Header variant='header__min' title='Top rated movies' />
      <Article name='top-rated-movies'>
        <Container>
          <Layout variant='grid grid--sidebar'>
            <Sidebar />
            <Main>
              <MobileSidebarControls />
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
                data={movieQueries.pages}
                hasNextPage={hasNextPage}
                fetchNextPage={fetchNextPage}
              />
            </Main>
          </Layout>
        </Container>
      </Article>
    </>
  );
}
