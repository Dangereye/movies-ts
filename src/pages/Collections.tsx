import { useParams } from 'react-router-dom';

// Components
import Article from '../components/articles/Article';
import Container from '../components/container/Container';
import BodyText from '../components/typography/BodyText';
import useMakeQuery from '../hooks/useMakeQuery';

// Interfaces
import { ICollections } from '../interfaces/ICollections';
import H2 from '../components/typography/H2';
import Header from '../components/header/Header';
import Overview from '../components/header/Overview';
import SubNavbar from '../components/sub_navbar/SubNavbar';
import UserScore from '../components/header/UserScore';
import Wrapper from '../components/wrapper/Wrapper';
import Navigation from '../components/navigation/Navigation';

export default function Collections() {
  const { collectionId } = useParams();
  let genres: number[] = [];
  let vote_averages: number[] = [];
  let vote_average = 0;

  const { data, isLoading, isError } = useMakeQuery<ICollections>(
    'Collection',
    `collection/${collectionId}`
  );

  if (isLoading) {
    return <H2 heading='Loading' />;
  }

  if (isError) {
    return <H2 heading='Error' />;
  }

  if (data) {
    data.parts.map((item) => {
      vote_averages = [...vote_averages, item.vote_average];
      genres = [...genres, ...item.genre_ids];
    });

    vote_average =
      vote_averages.reduce((a, b) => a + b, 0) / vote_averages.length;
    genres = genres.filter((item, i) => genres.indexOf(item) === i);
  }

  return (
    <>
      <SubNavbar />
      <Header
        variant='header__full'
        bgImage={data?.backdrop_path}
        image={data?.poster_path}
        alt={data?.name}
        title={data?.name}
      >
        <Wrapper name='info-bar' variant='flex'>
          <Navigation
            data={genres}
            getId={(item) => item}
            getLink={(item) => `/genre/${item}/movie`}
            renderItem={(item) => item}
            variant='comma-separated'
          />
        </Wrapper>
        <UserScore rating={vote_average} />
        <Overview text={data?.overview} />
      </Header>
    </>
  );
}
