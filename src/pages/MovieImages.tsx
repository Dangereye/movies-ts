// React
import { useContext } from 'react';

// React router
import { useParams } from 'react-router-dom';

// Context
import { ImagesFiltersContext } from '../contexts/ImagesFiltersContext';

// Interfaces
import { IMovieFull } from '../interfaces/IMovieFull';

// Hooks
import useMakeQuery from '../hooks/useMakeQuery';
import useCreateImages from '../hooks/useCreateImages';

// Components
import SubNavbar from '../components/sub_navbar/SubNavbar';
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
import MobileSidebarFiltersButtons from '../components/sidebar/mobile_sidebar_filters_buttons/MobileSidebarFiltersButtons';

// Data
import { moviePages } from '../data/moviePages';

export default function MovieImages() {
  const { movieId } = useParams();
  const { state, dispatch } = useContext(ImagesFiltersContext);

  const images =
    state.languages[state.display.show_media_type][
      state.languages.active_language
    ];

  const { data, isError, isLoading } = useMakeQuery<IMovieFull>(
    `movie-${movieId}`,
    `movie/${movieId}`,
    `&append_to_response=images`
  );

  useCreateImages(movieId, data?.images);

  if (isLoading) {
    return (
      <>
        <SubNavbar navigation={moviePages} />
        <LoaderComponent variant='header-min' />
      </>
    );
  }

  if (isError) {
    return (
      <>
        <SubNavbar navigation={moviePages} />
        <ErrorComponent variant='section' />
      </>
    );
  }

  const openModal = (index: number) => {
    dispatch({
      type: 'SET_FILTERS',
      payload: { ...state, modal: { is_active: true, index } },
    });
  };

  return (
    <>
      <SubNavbar navigation={moviePages} />
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
                <Container>
                  <MobileSidebarFiltersButtons />
                  <div className='images__list'>
                    {images?.length ? (
                      images.map((image, i) => (
                        <div
                          className='img'
                          key={image.file_path}
                          onClick={() => openModal(i)}
                        >
                          <ImageComponent
                            key={image.file_path}
                            file_path='https://image.tmdb.org/t/p/w500/'
                            filename={image.file_path}
                            fallback='/images/error_500x750.webp'
                            width={500}
                            aspect_ratio={
                              state.display.show_media_type === 'backdrops'
                                ? 'aspect-ratio-16-9'
                                : 'aspect-ratio-2-3'
                            }
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
                </Container>
              </Article>
            </Main>
          </Layout>
        </Container>
      </Section>
    </>
  );
}
