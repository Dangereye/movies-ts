import { useParams } from 'react-router-dom';
import { IMovieFull } from '../interfaces/IMovieFull';
import useMakeQuery from '../hooks/useMakeQuery';
import SubNavbar from '../components/sub_navbar/SubNavbar';
import Navigation from '../components/navigation/Navigation';
import { moviePages } from '../data/moviePages';
import Main from '../components/main/Main';
import Container from '../components/container/Container';
import LoaderComponent from '../components/loader/Loader';
import ErrorComponent from '../components/error/Error';
import Header from '../components/header/Header';
import Layout from '../components/layout/Layout';
import Sidebar from '../components/sidebar/Sidebar';
import Section from '../components/sections/Section';
import { useState } from 'react';
import H2 from '../components/typography/H2';
import Article from '../components/articles/Article';
import ArticleImages from '../components/articles/ArticleImages';
import ImageComponent from '../components/images/Image';

type DisplayProps = 'posters' | 'backdrops';

export default function MovieImages() {
  const { movieId } = useParams();
  const [display, setDisplay] = useState<DisplayProps>('posters');

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
        <Section>
          <Main>
            <Container>
              <LoaderComponent />
            </Container>
          </Main>
        </Section>
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
        <Section>
          <Main>
            <Container>
              <ErrorComponent />
            </Container>
          </Main>
        </Section>
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
        title={`Movie ${display}`}
      />
      <Section>
        <Container>
          <Layout variant='grid grid--sidebar'>
            <Sidebar />
            <Main>
              <Article name={display}>
                <div className='images__list'>
                  {data?.images[display].map((img, i) => (
                    <ImageComponent
                      key={img.file_path}
                      src={`https://image.tmdb.org/t/p/w500/${img.file_path}`}
                      fallback='/images/error_500x750.webp'
                      width={500}
                      height={750}
                      alt={`${display}-${i}`}
                    />
                  ))}
                </div>
              </Article>
            </Main>
          </Layout>
        </Container>
      </Section>
    </>
  );
}
