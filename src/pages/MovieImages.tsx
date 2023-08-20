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

// Articles
import ArticleImageList from '../components/articles/ArticleImageList';

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
              <ArticleImageList data={images} openModal={openModal} />
            </Main>
          </Layout>
        </Container>
      </Section>
    </>
  );
}
