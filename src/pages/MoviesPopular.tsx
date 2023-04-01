import Article from '../components/articles/Article';
import Container from '../components/container/Container';
import Layout from '../components/layout/Layout';
import Main from '../components/main/Main';
import Navigation from '../components/navigation/Navigation';
import Sidebar from '../components/sidebar/Sidebar';
import SubNavbar from '../components/sub_navbar/SubNavbar';
import H2 from '../components/typography/H2';
import { moviePages } from '../data/moviePages';
import useMakeQuery from '../hooks/useMakeQuery';
import { IMovieMin } from '../interfaces/IMovieMin';
import { IPage } from '../interfaces/IPage';

export default function MoviesPopular() {
  const {
    data: movies,
    isLoading,
    isError,
  } = useMakeQuery<IPage<IMovieMin>>('popular movies', '/movie/popular');

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
          getID={(item) => item.name}
          getLink={(item) => item.link}
          renderItem={(item) => item.name}
          variant='horizontal'
        />
      </SubNavbar>
      <Article name='popular-movies'>
        <Container>
          <H2 heading='Popular Movies' />
          <Layout variant='grid grid--sidebar'>
            <Sidebar>sidebar</Sidebar>
            <Main>main</Main>
          </Layout>
        </Container>
      </Article>
    </>
  );
}
