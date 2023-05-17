import { useContext, useEffect } from 'react';
import { FiltersContext } from '../contexts/FiltersContext';
import { IPage } from '../interfaces/IPage';
import { IMovieMin } from '../interfaces/IMovieMin';
import useMakeInfiniteQuery from '../hooks/useMakeInfiniteQuery';
import H2 from '../components/typography/H2';
import SubNavbar from '../components/sub_navbar/SubNavbar';
import Navigation from '../components/navigation/Navigation';
import { moviePages } from '../data/moviePages';
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
import { formatDate } from '../utilities/formatDate';

export default function MoviesNowPlaying() {
  // const { sort, adult, dateFrom, dateTo, genres } = useContext(FiltersContext);
  const { state, dispatch } = useContext(FiltersContext);

  const getNextPageParam = (page: IPage<IMovieMin>) => page.page + 1;

  const {
    data: movieQueries,
    isError,
    isLoading,
    refetch,
    hasNextPage,
    fetchNextPage,
  } = useMakeInfiniteQuery<IPage<IMovieMin>>(
    // 'movie/now_playing',
    // '',
    'discover/movie',
    `&sort_by=${state.sort}&include_adult=${
      state.adult
    }&with_release_type=${state.release_types.toString().replaceAll(',', '|')}${
      state.date_from ? `&primary_release_date.gte=${state.date_from}` : ''
    }${state.date_to ? `&primary_release_date.lte=${state.date_to}` : ''}${
      state.genres.length ? `&with_genres=${state.genres}` : ''
    }`,
    getNextPageParam
  );

  useEffect(() => {
    dispatch({
      type: 'SET_STATE',
      payload: { ...state, release_types: [2, 3] },
    });
  }, []);

  useEffect(() => {
    refetch();
  }, [state.sort, state.adult, state.date_from, state.date_to, state.genres]);

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
      <Header variant='header__min' title='Theatrical releases' />
      <Article name='movies-in-cinemas'>
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
