import { useEffect, useContext, Fragment } from 'react';

// Hooks
import useMakeInfiniteQuery from '../hooks/useMakeInfiniteQuery';

// Components
import Article from '../components/articles/Article';
import CardContent from '../components/cards/card/CardContent';
import Container from '../components/container/Container';
import ImageComponent from '../components/image/Image';
import Layout from '../components/layout/Layout';
import Main from '../components/main/Main';
import Navigation from '../components/navigation/Navigation';
import Sidebar from '../components/sidebar/Sidebar';
import SubNavbar from '../components/sub_navbar/SubNavbar';
import BodyText from '../components/typography/BodyText';
import H2 from '../components/typography/H2';
import Header from '../components/header/Header';
import MobileSidebarControls from '../components/sidebar/mobile_sidebar_controls/MobileSidebarControls';

// Context
import { FiltersContext } from '../contexts/FiltersContext';

// Data
import { moviePages } from '../data/moviePages';

// Interfaces
import { IPage } from '../interfaces/IPage';
import { IMovieMin } from '../interfaces/IMovieMin';

// Utilities
import { formatDate } from '../utilities/formatDate';
import Button from '../components/buttons/Button';
import { Link } from 'react-router-dom';
import InfiniteCards from '../components/cards/InifinteCards';

export default function MoviesPopular() {
  const { sort, adult, dateFrom, dateTo, genres } = useContext(FiltersContext);

  const getNextPageParam = (page: IPage<IMovieMin>) => page.page + 1;

  const {
    data: movieQueries,
    isError,
    isLoading,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useMakeInfiniteQuery<IPage<IMovieMin>>(
    'discover/movie',
    `&sort_by=${sort}&include_adult=${adult}${
      dateFrom ? `&primary_release_date.gte=${dateFrom}` : ''
    }${dateTo ? `&primary_release_date.lte=${dateTo}` : ''}${
      genres.length ? `&with_genres=${genres}` : ''
    }`,
    getNextPageParam
  );

  useEffect(() => {
    refetch();
  }, [sort, adult, dateFrom, dateTo, genres]);

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
      <Header variant='header__min' title='Popular movies' />
      <Article name='popular-movies'>
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
              />
              <Button
                name={
                  isFetchingNextPage
                    ? 'Loading more'
                    : hasNextPage
                    ? 'load more'
                    : "That's all folks!"
                }
                disabled={!hasNextPage}
                variant='btn--primary'
                onClick={() => fetchNextPage()}
              />
            </Main>
          </Layout>
        </Container>
      </Article>
    </>
  );
}
