// React
import { useContext, useEffect } from 'react';

// React router
import { useParams } from 'react-router-dom';

// Context
import { ImagesFiltersContext } from '../contexts/ImagesFiltersContext';

// Interfaces
import { ITVShowFull } from '../interfaces/ITVShowFull';
import { IImages } from '../interfaces/IImages';

// Hooks
import useMakeQuery from '../hooks/useMakeQuery';

// Components
import SubNavbar from '../components/sub_navbar/SubNavbar';
import Navigation from '../components/navigation/Navigation';
import Main from '../components/main/Main';
import Container from '../components/container/Container';
import LoaderComponent from '../components/loader/Loader';
import ErrorComponent from '../components/error/Error';
import Header from '../components/header/Header';
import Layout from '../components/layout/Layout';
import Sidebar from '../components/sidebar/Sidebar';
import Section from '../components/sections/Section';
import Article from '../components/articles/Article';
import ImageComponent from '../components/images/Image';
import NoResults from '../components/typography/NoResults';

// Data
import { tvPages } from '../data/tvPages';

export default function TvImages() {
  const { tvId } = useParams();
  const { state, dispatch } = useContext(ImagesFiltersContext);

  const { data, isError, isLoading } = useMakeQuery<ITVShowFull>(
    `tv-${tvId}`,
    `tv/${tvId}`,
    `&append_to_response=images`
  );

  useEffect(() => {
    if (data) {
      let posters: { [key: string]: IImages[] } = {};
      let backdrops: { [key: string]: IImages[] } = {};

      data.images.posters.forEach((img) => {
        if (posters[img.iso_639_1]) {
          posters[img.iso_639_1].push(img);
        } else {
          posters = { ...posters, [img.iso_639_1]: [img] };
        }
      });

      data.images.backdrops.forEach((img) => {
        if (backdrops[img.iso_639_1]) {
          backdrops[img.iso_639_1].push(img);
        } else {
          backdrops = { ...backdrops, [img.iso_639_1]: [img] };
        }
      });

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
            },
          },
          languages: {
            ...state.languages,
            posters,
            backdrops,
          },
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (isLoading) {
    return (
      <>
        <SubNavbar>
          <Navigation
            data={tvPages}
            getId={(item) => item.name}
            getLink={(item) => item.link}
            renderItem={(item) => item.name}
            variant='horizontal'
          />
        </SubNavbar>
        <LoaderComponent variant='header-min' />
      </>
    );
  }

  if (isError) {
    return (
      <>
        <SubNavbar>
          <Navigation
            data={tvPages}
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
          data={tvPages}
          getId={(item) => item.name}
          getLink={(item) => item.link}
          renderItem={(item) => item.name}
          variant='horizontal'
        />
      </SubNavbar>
      <Header
        variant='header__min'
        leadTitle={data?.name}
        title={`TV ${state.display.show_media_type}`}
      />
      <Section>
        <Container>
          <Layout variant='grid grid--sidebar'>
            <Sidebar />
            <Main>
              <Article name={state.display.show_media_type}>
                <div className='images__list'>
                  {state.display.show_media_type === 'posters' &&
                  state.languages.posters[state.languages.active_language] ? (
                    state?.languages.posters[
                      state.languages.active_language
                    ]?.map((img, i) => (
                      <div className='img'>
                        <ImageComponent
                          key={img.file_path}
                          src={`https://image.tmdb.org/t/p/w500/${img.file_path}`}
                          fallback='/images/error_500x750.webp'
                          width={500}
                          height={750}
                          alt={`${state.display.show_media_type}-${i}`}
                        />
                      </div>
                    ))
                  ) : state.display.show_media_type === 'backdrops' &&
                    state.languages.backdrops[
                      state.languages.active_language
                    ] ? (
                    state?.languages.backdrops[
                      state.languages.active_language
                    ]?.map((img, i) => (
                      <div className='img'>
                        <ImageComponent
                          key={img.file_path}
                          src={`https://image.tmdb.org/t/p/w500/${img.file_path}`}
                          fallback='/images/error_500x750.webp'
                          width={1000}
                          alt={`${state.display.show_media_type}-${i}`}
                        />
                      </div>
                    ))
                  ) : (
                    <NoResults
                      text={`Please select a language to display ${state.display.show_media_type}.`}
                    />
                  )}
                </div>
              </Article>
            </Main>
          </Layout>
        </Container>
      </Section>
    </>
  );
}
