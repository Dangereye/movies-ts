// Hooks
import useMakeQuery from '../hooks/useMakeQuery';

// Components
import Article from '../components/articles/Article';
import CardContent from '../components/cards/card/CardContent';
import Cards from '../components/cards/Cards';
import Container from '../components/container/Container';
import ImageComponent from '../components/image/Image';
import Layout from '../components/layout/Layout';
import Main from '../components/main/Main';
import Navigation from '../components/navigation/Navigation';
import Sidebar from '../components/sidebar/Sidebar';
import SubNavbar from '../components/sub_navbar/SubNavbar';
import BodyText from '../components/typography/BodyText';
import H2 from '../components/typography/H2';

// Data
import { moviePages } from '../data/moviePages';

// Interfaces
import { IPage } from '../interfaces/IPage';
import { IMovieMin } from '../interfaces/IMovieMin';

// Utilities
import { formatDate } from '../utilities/formatDate';
import useCreateMovieGenres from '../hooks/useCreateMovieGenres';

export default function MoviesPopular() {
  const {
    data: movies,
    isLoading,
    isError,
  } = useMakeQuery<IPage<IMovieMin>>('popular movies', '/movie/popular');
  const genres = useCreateMovieGenres();

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
      <Article name='popular-movies'>
        <Container>
          <H2 heading='Popular Movies' />
          <Layout variant='grid grid--sidebar'>
            <Sidebar>
              <Navigation
                variant='vertical'
                getId={(item) => item.id}
                getLink={(item) => `/genre/${item.id}/movie`}
                renderItem={(item) => item.name}
                data={genres}
              />
            </Sidebar>
            <Main>
              <Cards
                variant='list'
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
                data={movies?.results}
              />
            </Main>
          </Layout>
        </Container>
      </Article>
    </>
  );
}
