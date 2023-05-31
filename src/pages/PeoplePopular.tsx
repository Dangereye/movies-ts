import { IPage } from '../interfaces/IPage';
import { IPerson } from '../interfaces/IPerson';
import { useEffect, useContext } from 'react';

// Hooks
import useMakeInfiniteQuery from '../hooks/useMakeInfiniteQuery';
import useAppend from '../hooks/useAppendMovie';

// Components
import Article from '../components/articles/Article';
import CardContent from '../components/cards/card/CardContent';
import Container from '../components/container/Container';
import ImageComponent from '../components/image/Image';
import Layout from '../components/layout/Layout';
import Main from '../components/main/Main';
import Navigation from '../components/navigation/Navigation';
import Sidebar from '../components/sidebar/Sidebar';
import SubNavbar from '../components/sub_navbar/SubNavbar';
import BodyText from '../components/typography/BodyText';
import H2 from '../components/typography/H2';
import Header from '../components/header/Header';
import MobileSidebarControls from '../components/sidebar/mobile_sidebar_controls/MobileSidebarControls';
import InfiniteCards from '../components/cards/InifinteCards';

// Utilities
import { formatDate } from '../utilities/formatDate';
import { peoplePages } from '../data/peoplePages';

export default function PeoplePopular() {
  const getNextPageParam = (page: IPage<IPerson>) => page.page + 1;

  const {
    data: movieQueries,
    isError,
    isLoading,
    refetch,
    hasNextPage,
    fetchNextPage,
  } = useMakeInfiniteQuery<IPage<IPerson>>(
    'person/popular',
    '',
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
          data={peoplePages}
          getId={(item) => item.name}
          getLink={(item) => item.link}
          renderItem={(item) => item.name}
          variant='horizontal'
        />
      </SubNavbar>
      <Header variant='header__min' title='Popular people' />
      <Article name='popular-people'>
        <Container>
          <InfiniteCards
            getId={(item) => item.id}
            getLink={(item) => `/people/${item.id}`}
            renderContent={(item) => (
              <>
                <ImageComponent
                  src={`https://image.tmdb.org/t/p/w500/${item.profile_path}`}
                  fallback='/images/error_500x750.webp'
                  alt={item.name}
                />
                <CardContent heading={item.name}>
                  <BodyText text={item.known_for_department} />
                </CardContent>
              </>
            )}
            data={movieQueries.pages}
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
          />
        </Container>
      </Article>
    </>
  );
}
