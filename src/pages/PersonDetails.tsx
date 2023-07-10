// React router
import { useParams } from 'react-router-dom';

// Icons
import { GiHastyGrave } from 'react-icons/gi';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { RiCake2Line } from 'react-icons/ri';

// Articles
import ArticleMoviesMin from '../components/articles/ArticleMoviesMin';
import ArticleTvMin from '../components/articles/ArticleTvMin';

// Components
import SubNavbar from '../components/sub_navbar/SubNavbar';
import Header from '../components/header/Header';
import Article from '../components/articles/Article';
import Navigation from '../components/navigation/Navigation';
import Statistics from '../components/statistics/Statistics';
import ExpandableText from '../components/typography/ExpandableText';
import HDiv from '../components/typography/HDiv';
import IconText from '../components/typography/IconText';
import Wrapper from '../components/wrapper/Wrapper';
import Main from '../components/main/Main';
import Container from '../components/container/Container';
import LoaderComponent from '../components/loader/Loader';
import ErrorComponent from '../components/error/Error';

// Data
import { peoplePages } from '../data/peoplePages';

// Hooks
import useMakeQuery from '../hooks/useMakeQuery';

// Interfaces
import { IPerson } from '../interfaces/IPerson';

// Utilities
import { formatDate } from '../utilities/formatDate';
import Section from '../components/sections/Section';

export default function TvDetails() {
  const { personId } = useParams();
  const {
    data: person,
    isError,
    isLoading,
  } = useMakeQuery<IPerson>(
    `person-${personId}`,
    `person/${personId}`,
    `&append_to_response=combined_credits,movie_credits,tv_credits,external_ids`
  );

  if (isLoading) {
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
            data={peoplePages}
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
          data={peoplePages}
          getId={(item) => item.name}
          getLink={(item) => item.link}
          renderItem={(item) => item.name}
          variant='horizontal'
        />
      </SubNavbar>
      <Header
        variant='header__full'
        image={person?.profile_path}
        bgImage={person?.movie_credits?.cast[0]?.backdrop_path}
        alt={person?.name}
        title={person?.name}
      >
        <Wrapper name='info-bar' variant='flex'>
          <IconText
            name='birthday'
            icon={<RiCake2Line />}
            text={formatDate(person?.birthday)}
          />
          <IconText
            name='place-of-birth'
            icon={<HiOutlineLocationMarker />}
            text={person?.place_of_birth}
          />
          <IconText
            name='deathday'
            icon={<GiHastyGrave />}
            text={formatDate(person?.deathday)}
          />
        </Wrapper>
        <HDiv variant='heading--h4' heading='Biography' />
        <ExpandableText
          text={person?.biography ? person?.biography : 'Unavailable'}
          lines={8}
        />
      </Header>
      <Statistics person={person} />
      <Section>
        <Main>
          <ArticleMoviesMin
            variant='scroll-x'
            name='movie-cast'
            heading='Movie cast'
            data={person?.movie_credits.cast}
          />
          <ArticleMoviesMin
            variant='scroll-x'
            name='movie-crew'
            heading='Movie crew'
            data={person?.movie_credits.crew}
          />
          <ArticleTvMin
            variant='scroll-x'
            name='tv-cast'
            heading='TV cast'
            data={person?.tv_credits.cast}
          />
          <ArticleTvMin
            variant='scroll-x'
            name='tv-crew'
            heading='TV crew'
            data={person?.tv_credits.crew}
          />
        </Main>
      </Section>
    </>
  );
}
