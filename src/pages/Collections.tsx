// React
import { useMemo, useState } from 'react';

// React Router
import { useParams } from 'react-router-dom';

// Hooks
import useMakeQuery from '../hooks/useMakeQuery';
import useCreateGenres from '../hooks/useCreateGenres';

// Components
import LoaderComponent from '../components/loader/Loader';
import ErrorComponent from '../components/error/Error';
import SubNavbar from '../components/sub_navbar/SubNavbar';
import Header from '../components/header/Header';
import Main from '../components/main/Main';
import Overview from '../components/header/Overview';
import UserScore from '../components/header/UserScore';
import Wrapper from '../components/wrapper/Wrapper';
import Navigation from '../components/navigation/Navigation';
import Cards from '../components/cards/Cards';
import Section from '../components/sections/Section';

// Interfaces
import { ICollections } from '../interfaces/ICollections';

// Data
import { moviePages } from '../data/moviePages';

// Utilities
import { formatDate } from '../utilities/formatDate';
import { stringToDate } from '../utilities/stringToDate';

export default function Collections() {
  const { collectionId } = useParams();
  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);
  const [votes, setVotes] = useState(0);

  const allGenres = useCreateGenres('genre-list', 'genre/movie/list');

  const { data, isLoading, isError } = useMakeQuery<ICollections>(
    'Collection',
    `collection/${collectionId}`
  );

  useMemo(() => {
    let collectionGenresNumbers: number[] = [];
    let collectionGenres: { id: number; name: string }[] = [];
    let vote_averages: number[] = [];
    let vote_average = 0;
    if (data) {
      data.parts.forEach((item) => {
        if (item.vote_average > 0) {
          vote_averages = [...vote_averages, item.vote_average];
        }

        collectionGenresNumbers = [
          ...collectionGenresNumbers,
          ...item.genre_ids,
        ];
      });

      vote_average =
        vote_averages.reduce((a, b) => a + b, 0) / vote_averages.length;
      collectionGenresNumbers = collectionGenresNumbers.filter(
        (item, i) => collectionGenresNumbers.indexOf(item) === i
      );

      collectionGenresNumbers.forEach((item) => {
        allGenres.find((genre) => {
          if (genre.id === item) {
            collectionGenres = [
              ...collectionGenres,
              { id: genre.id, name: genre.name },
            ];
          }
          return null;
        });
      });
    }
    setVotes(vote_average);
    setGenres(collectionGenres);

    // eslint-disable-next-line
  }, [data]);

  if (isLoading) {
    return (
      <>
        <SubNavbar navigation={moviePages} />
        <LoaderComponent variant='header-full' />
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

  return (
    <>
      <SubNavbar navigation={moviePages} />
      <Header
        variant='header__full'
        bgImage={data?.backdrop_path}
        image={data?.poster_path}
        poster_sizes='w500'
        alt={data?.name}
        title={data?.name}
        leadTitle='Movies'
      >
        <Wrapper name='info-bar' variant='flex'>
          <Navigation
            data={genres}
            getId={(item) => item.id}
            getLink={(item) => `/genre/${item.id}/movie`}
            renderItem={(item) => item.name}
            variant='comma-separated'
          />
        </Wrapper>
        <UserScore rating={votes} />
        <Overview text={data?.overview} />
      </Header>
      <Section>
        <Main>
          <Cards
            article
            heading='movies in collection'
            media_type='movies'
            variant='list'
            data={data?.parts}
            getId={(item) => item.id}
            getLink={(item) => `/movies/${item.id}`}
            getHeading={(item) => item.title}
            getImage={(item) => item.poster_path}
            poster_sizes='w300'
            getVotes={(item) => item.vote_average}
            getBodyText={(item) => formatDate(item.release_date)}
            sortItems={(a, b) =>
              stringToDate(b.release_date) - stringToDate(a.release_date)
            }
          />
        </Main>
      </Section>
    </>
  );
}
