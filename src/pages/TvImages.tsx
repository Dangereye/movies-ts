// React
import { useContext } from 'react';

// React router
import { useParams } from 'react-router-dom';

// Context
import { ImagesFiltersContext } from '../contexts/ImagesFiltersContext';

// Interfaces
import { ITVShowFull } from '../interfaces/ITVShowFull';

// Hooks
import useMakeQuery from '../hooks/useMakeQuery';
import useCreateImages from '../hooks/useCreateImages';

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
import ImageComponent from '../components/image/Image';
import NoResults from '../components/typography/NoResults';

// Data
import { tvPages } from '../data/tvPages';

export default function TvImages() {
  const { tvId } = useParams();
  const { state } = useContext(ImagesFiltersContext);

  const images =
    state.languages[state.display.show_media_type][
      state.languages.active_language
    ];

  const { data, isError, isLoading } = useMakeQuery<ITVShowFull>(
    `tv-${tvId}`,
    `tv/${tvId}`,
    `&append_to_response=images`
  );

  const {} = useCreateImages(tvId, data?.images);

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
                  {images?.length ? (
                    images.map((image, i) => (
                      <div className='img' key={image.file_path}>
                        <ImageComponent
                          key={image.file_path}
                          src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                          fallback='/images/error_500x750.webp'
                          width={500}
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