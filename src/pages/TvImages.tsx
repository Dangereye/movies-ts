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
import { tvPages } from '../data/tvPages';

export default function TvImages() {
  const { tvId } = useParams();
  const { state, dispatch } = useContext(ImagesFiltersContext);

  const images =
    state.languages[state.display.show_media_type][
      state.languages.active_language
    ];

  const { data, isError, isLoading } = useMakeQuery<ITVShowFull>(
    `tv-${tvId}`,
    `tv/${tvId}`,
    `&append_to_response=images`
  );

  useCreateImages(tvId, data?.images);

  const openModal = (index: number) => {
    dispatch({
      type: 'SET_FILTERS',
      payload: { ...state, modal: { is_active: true, index } },
    });
  };

  if (isLoading) {
    return (
      <>
        <SubNavbar navigation={tvPages} />
        <LoaderComponent variant='header-min' />
      </>
    );
  }

  if (isError) {
    return (
      <>
        <SubNavbar navigation={tvPages} />
        <ErrorComponent variant='section' />
      </>
    );
  }

  return (
    <>
      <SubNavbar navigation={tvPages} />
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
              <ArticleImageList images={images} openModal={openModal} />
            </Main>
          </Layout>
        </Container>
      </Section>
    </>
  );
}
