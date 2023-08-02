// React router
import { useParams } from 'react-router-dom';

// Icons
import { GiHastyGrave } from 'react-icons/gi';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { RiCake2Line } from 'react-icons/ri';

// Articles
import ArticleProfileImages from '../components/articles/ArticleProfileImages';

// Components
import SubNavbar from '../components/sub_navbar/SubNavbar';
import Header from '../components/header/Header';
import Statistics from '../components/statistics/Statistics';
import ExpandableText from '../components/typography/ExpandableText';
import HDiv from '../components/typography/HDiv';
import IconText from '../components/typography/IconText';
import Wrapper from '../components/wrapper/Wrapper';
import Main from '../components/main/Main';
import LoaderComponent from '../components/loader/Loader';
import ErrorComponent from '../components/error/Error';
import Section from '../components/sections/Section';
import Cards from '../components/cards/Cards';

// Data
import { peoplePages } from '../data/peoplePages';

// Hooks
import useMakeQuery from '../hooks/useMakeQuery';

// Interfaces
import { IPerson } from '../interfaces/IPerson';

// Utilities
import { formatDate } from '../utilities/formatDate';

export default function TvDetails() {
  const { personId } = useParams();
  const {
    data: person,
    isError,
    isLoading,
  } = useMakeQuery<IPerson>(
    `person-${personId}`,
    `person/${personId}`,
    `&append_to_response=combined_credits,movie_credits,tv_credits,external_ids,images`
  );

  if (isLoading) {
    return (
      <>
        <SubNavbar navigation={peoplePages} />
        <LoaderComponent variant='header-full' />
      </>
    );
  }

  if (isError) {
    return (
      <>
        <SubNavbar navigation={peoplePages} />
        <ErrorComponent variant='section' />
      </>
    );
  }

  return (
    <>
      <SubNavbar navigation={peoplePages} />
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
          <ArticleProfileImages data={person?.images.profiles} />
          <Cards
            article
            heading='movie cast'
            media_type='movies'
            variant='scroll-x'
            data={person?.movie_credits.cast}
            getId={(item) => item.id}
            getLink={(item) => `/movies/${item.id}`}
            getHeading={(item) => item.title}
            getImage={(item) => item.poster_path}
            getVotes={(item) => item.vote_average}
            getBodyText={(item) => `${formatDate(item.release_date)}`}
            sortItems={(a, b) => b.popularity - a.popularity}
          />
          <Cards
            article
            heading='movie crew'
            media_type='movies'
            variant='scroll-x'
            data={person?.movie_credits.crew}
            getId={(item) => item.id}
            getLink={(item) => `/movies/${item.id}`}
            getHeading={(item) => item.title}
            getImage={(item) => item.poster_path}
            getVotes={(item) => item.vote_average}
            getBodyText={(item) => `${formatDate(item.release_date)}`}
            sortItems={(a, b) => b.popularity - a.popularity}
          />
          <Cards
            article
            heading='TV show cast'
            media_type='TV shows'
            variant='scroll-x'
            data={person?.tv_credits.cast}
            getId={(item) => item.id}
            getLink={(item) => `/tv/${item.id}`}
            getHeading={(item) => item.name}
            getImage={(item) => item.poster_path}
            getVotes={(item) => item.vote_average}
            getBodyText={(item) => `${formatDate(item.first_air_date)}`}
            sortItems={(a, b) => b.popularity - a.popularity}
          />
          <Cards
            article
            heading='TV show crew'
            media_type='TV shows'
            variant='scroll-x'
            data={person?.tv_credits.crew}
            getId={(item) => item.id}
            getLink={(item) => `/tv/${item.id}`}
            getHeading={(item) => item.name}
            getImage={(item) => item.poster_path}
            getVotes={(item) => item.vote_average}
            getBodyText={(item) => `${formatDate(item.first_air_date)}`}
            sortItems={(a, b) => b.popularity - a.popularity}
          />
        </Main>
      </Section>
    </>
  );
}
