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
import { useContext, useEffect, useState } from 'react';
import H2 from '../components/typography/H2';
import Article from '../components/articles/Article';
import ArticleImages from '../components/articles/ArticleImages';
import ImageComponent from '../components/images/Image';
import { ImagesFiltersContext } from '../contexts/ImagesFiltersContext';
import useCreateLanguages from '../hooks/useCreateLanguages';
import { IImages } from '../interfaces/IImages';

export default function MovieImages() {
  const { movieId } = useParams();
  const { state, dispatch } = useContext(ImagesFiltersContext);
  const [posters, setPosters] = useState<{ [key: string | number]: IImages[] }>(
    {}
  );
  let tempPosters: { [key: string]: IImages[] } = {};
  const languages = useCreateLanguages();

  const { data, isError, isLoading } = useMakeQuery<IMovieFull>(
    `movie-${movieId}`,
    `movie/${movieId}`,
    `&append_to_response=images`
  );

  useEffect(() => {
    data?.images.posters.forEach((img) => {
      if (tempPosters[img.iso_639_1]) {
        tempPosters[img.iso_639_1].push(img);
      } else {
        tempPosters = { ...tempPosters, [img.iso_639_1]: [img] };
      }
    });
    setPosters(tempPosters);
  }, [data, state.languages.active_language]);

  useEffect(() => {
    if (data) {
      dispatch({
        type: 'SET_FILTERS',
        payload: {
          ...state,
          display: {
            ...state.display,
            results: {
              ...state.display.results,
              posters: data?.images.posters.length,
              backdrops: data?.images.backdrops.length,
              logos: data?.images.logos.length,
            },
          },
          languages: {
            ...state.languages,
            posters,
          },
        },
      });
    }
  }, [data, state.display.show_media_type]);

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
        title={`Movie ${state.display.show_media_type}`}
      />
      <Section>
        <Container>
          <Layout variant='grid grid--sidebar'>
            <Sidebar />
            <Main>
              <Article name={state.display.show_media_type}>
                <div className='images__list'>
                  {state?.languages.posters[
                    state.languages.active_language
                  ]?.map((img, i) => (
                    <ImageComponent
                      key={img.file_path}
                      src={`https://image.tmdb.org/t/p/w500/${img.file_path}`}
                      fallback='/images/error_500x750.webp'
                      width={500}
                      height={750}
                      alt={`${state.display.show_media_type}-${i}`}
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
