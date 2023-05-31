import { useContext, useEffect } from 'react';
import useMakeInfiniteQuery from '../hooks/useMakeInfiniteQuery';
import { TvFiltersContext } from '../contexts/TvFiltersContext';
import useAppendTv from '../hooks/useAppendTv';
import { IPage } from '../interfaces/IPage';
import { ITVShowMin } from '../interfaces/ITVShowMin';
import H2 from '../components/typography/H2';
import SubNavbar from '../components/sub_navbar/SubNavbar';
import Navigation from '../components/navigation/Navigation';
import { tvPages } from '../data/tvPages';
import Header from '../components/header/Header';
import Article from '../components/articles/Article';
import Container from '../components/container/Container';
import Layout from '../components/layout/Layout';
import Sidebar from '../components/sidebar/Sidebar';
import Main from '../components/main/Main';
import MobileSidebarControls from '../components/sidebar/mobile_sidebar_controls/MobileSidebarControls';
import InfiniteCards from '../components/cards/InifinteCards';
import ImageComponent from '../components/image/Image';
import CardContent from '../components/cards/card/CardContent';
import BodyText from '../components/typography/BodyText';
import { formatDate } from '../utilities/formatDate';

export default function TvOnTv() {
  const getNextPageParam = (page: IPage<ITVShowMin>) => page.page + 1;
  const { state, dispatch } = useContext(TvFiltersContext);
  const { append } = useAppendTv();

  const {
    data: tvQueries,
    isError,
    isLoading,
    refetch,
    hasNextPage,
    fetchNextPage,
  } = useMakeInfiniteQuery<IPage<ITVShowMin>>(
    'discover/tv',
    append,
    getNextPageParam
  );

  useEffect(() => {
    dispatch({
      type: 'SET_DEFAULT_NEXT_7_DAYS',
      payload: { ...state },
    });
  }, []);

  useEffect(() => {
    refetch();
  }, [state]);

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
          data={tvPages}
          getId={(item) => item.name}
          getLink={(item) => item.link}
          renderItem={(item) => item.name}
          variant='horizontal'
        />
      </SubNavbar>
      <Header variant='header__min' title='TV Shows on the air ' />
      <Article name='tv-shows-on-the-air'>
        <Container>
          <Layout variant='grid grid--sidebar'>
            <Sidebar />
            <Main>
              <MobileSidebarControls />
              <InfiniteCards
                getId={(item) => item.id}
                getLink={(item) => `/tv/${item.id}`}
                renderContent={(item) => (
                  <>
                    <ImageComponent
                      src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                      fallback='/images/error_500x750.webp'
                      alt={item.name}
                    />
                    <CardContent heading={item.name} vote={item.vote_average}>
                      <BodyText text={`${formatDate(item.first_air_date)}`} />
                    </CardContent>
                  </>
                )}
                data={tvQueries.pages}
                hasNextPage={hasNextPage}
                fetchNextPage={fetchNextPage}
              />
            </Main>
          </Layout>
        </Container>
      </Article>
    </>
  );
}
