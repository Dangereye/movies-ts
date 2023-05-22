import Article from '../components/articles/Article';
import InfiniteCards from '../components/cards/InifinteCards';
import CardContent from '../components/cards/card/CardContent';
import Container from '../components/container/Container';
import Header from '../components/header/Header';
import ImageComponent from '../components/image/Image';
import Layout from '../components/layout/Layout';
import Main from '../components/main/Main';
import Navigation from '../components/navigation/Navigation';
import Sidebar from '../components/sidebar/Sidebar';
import MobileSidebarControls from '../components/sidebar/mobile_sidebar_controls/MobileSidebarControls';
import SubNavbar from '../components/sub_navbar/SubNavbar';
import BodyText from '../components/typography/BodyText';
import { tvPages } from '../data/tvPages';
import { IPage } from '../interfaces/IPage';
import { ITVShowMin } from '../interfaces/ITVShowMin';
import useMakeInfiniteQuery from '../hooks/useMakeInfiniteQuery';
import H2 from '../components/typography/H2';
import { formatDate } from '../utilities/formatDate';

export default function TvPopular() {
  const getNextPageParam = (page: IPage<ITVShowMin>) => page.page + 1;

  const {
    data: tvQueries,
    isError,
    isLoading,
    refetch,
    hasNextPage,
    fetchNextPage,
  } = useMakeInfiniteQuery<IPage<ITVShowMin>>(
    'discover/tv',
    '&with_watch_monetization_types=flatrate,free,ads,rent,buy&sort_by=popularity.desc',
    getNextPageParam
  );

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
      <Header variant='header__min' title='Popular TV Shows' />
      <Article name='popular-tv-shows'>
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
