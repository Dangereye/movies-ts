import { useParams } from 'react-router-dom';

// Hooks
import useMakeInfiniteQuery from '../hooks/useMakeInfiniteQuery';

// Interfaces
import { IPage } from '../interfaces/IPage';
import { IMovieMin } from '../interfaces/IMovieMin';

// Components
import SubNavbar from '../components/sub_navbar/SubNavbar';
import Container from '../components/container/Container';
import Article from '../components/articles/Article';
import BodyText from '../components/typography/BodyText';
import H2 from '../components/typography/H2';
import Main from '../components/main/Main';
import InfiniteCards from '../components/cards/InifinteCards';
import ImageComponent from '../components/image/Image';
import CardContent from '../components/cards/card/CardContent';

// Utilities
import { formatDate } from '../utilities/formatDate';
import Header from '../components/header/Header';
import Layout from '../components/layout/Layout';
import Sidebar from '../components/sidebar/Sidebar';

export default function Search() {
  const { searchId } = useParams();

  const getNextPageParam = (page: IPage<IMovieMin>) => page.page + 1;

  const {
    data: movies,
    isError: moviesError,
    isLoading: moviesLoading,
    hasNextPage: moviesHasNextPage,
    fetchNextPage: moviesFetchNextPage,
  } = useMakeInfiniteQuery<IPage<IMovieMin>>(
    'search/movie',
    `&query=${searchId}`,
    getNextPageParam
  );

  if (moviesLoading) {
    return <H2 heading='Loading' />;
  }

  if (moviesError) {
    return <H2 heading='Error' />;
  }
  return (
    <>
      <SubNavbar />
      <Header variant='header__min' title={`Search results: "${searchId}"`} />
      <Main>
        <Article name='movie-search-results'>
          <Container>
            <Layout variant='grid grid--sidebar'>
              <Sidebar />
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
                data={movies.pages}
                hasNextPage={moviesHasNextPage}
                fetchNextPage={moviesFetchNextPage}
              />
            </Layout>
          </Container>
        </Article>
      </Main>
    </>
  );
}
