import { useParams } from 'react-router-dom';
import { IMovieFull } from '../interfaces/IMovieFull';
import useMakeQuery from '../hooks/useMakeQuery';
import SubNavbar from '../components/sub_navbar/SubNavbar';
import Navigation from '../components/navigation/Navigation';
import { moviePages } from '../data/moviePages';
import Main from '../components/main/Main';
import Article from '../components/articles/Article';
import Container from '../components/container/Container';
import LoaderComponent from '../components/loader/Loader';
import ErrorComponent from '../components/error/Error';
import Header from '../components/header/Header';
import Layout from '../components/layout/Layout';
import Sidebar from '../components/sidebar/Sidebar';
import Section from '../components/sections/Section';

export default function MovieImages() {
  const { movieId } = useParams();

  const { data, isError, isLoading } = useMakeQuery<IMovieFull>(
    `movie-${movieId}`,
    `movie/${movieId}`,
    `&append_to_response=images`
  );

  if (isLoading) {
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
        <Main>
          <Article name='Loading'>
            <Container>
              <LoaderComponent />
            </Container>
          </Article>
        </Main>
      </>
    );
  }

  if (isError) {
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
        <Main>
          <Article name='Error'>
            <Container>
              <ErrorComponent />
            </Container>
          </Article>
        </Main>
      </>
    );
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
      <Header
        variant='header__min'
        leadTitle={data?.title}
        title='Movie images'
      />
      <Section>
        <Container>
          <Layout variant='grid grid--sidebar'>
            <Sidebar />
            <Main>test</Main>
          </Layout>
        </Container>
      </Section>
    </>
  );
}
