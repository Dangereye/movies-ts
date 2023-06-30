import { useParams } from 'react-router-dom';
import { useMemo, useState } from 'react';

// Hooks
import useMakeQuery from '../hooks/useMakeQuery';
import useCreateGenres from '../hooks/useCreateGenres';

// Components
import H2 from '../components/typography/H2';
import Header from '../components/header/Header';
import Overview from '../components/header/Overview';
import SubNavbar from '../components/sub_navbar/SubNavbar';
import UserScore from '../components/header/UserScore';
import Wrapper from '../components/wrapper/Wrapper';
import Navigation from '../components/navigation/Navigation';

// Interfaces
import { ICollections } from '../interfaces/ICollections';
import Main from '../components/main/Main';
import Container from '../components/container/Container';
import ArticleMoviesMin from '../components/articles/ArticleMoviesMin';
import Article from '../components/articles/Article';
import BodyText from '../components/typography/BodyText';
import Cards from '../components/cards/Cards';
import ImageComponent from '../components/image/Image';
import CardContent from '../components/cards/card/CardContent';
import { formatDate } from '../utilities/formatDate';
import Loader from '../components/loader/Loader';
import Button from '../components/buttons/Button';
import ErrorComponent from '../components/error/Error';

export default function Collections() {
  const { collectionId } = useParams();
  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);
  const [votes, setVotes] = useState(0);

  const allGenres = useCreateGenres('genre-list', 'genre/movie/list');
  let collectionGenresNumbers: number[] = [];
  let collectionGenres: { id: number; name: string }[] = [];
  let vote_averages: number[] = [];
  let vote_average = 0;

  const { data, isLoading, isError } = useMakeQuery<ICollections>(
    'Collection',
    `collection/${collectionId}`
  );

  useMemo(() => {
    if (data) {
      data.parts.map((item) => {
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
        });
      });
    }
    setVotes(vote_average);
    setGenres(collectionGenres);
  }, [data]);

  if (isLoading) {
    return (
      <>
        <SubNavbar />
        <Main>
          <Article name='loading'>
            <Container>
              <Loader />
            </Container>
          </Article>
        </Main>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <SubNavbar />
        <Main>
          <Article name='error'>
            <Container>
              <ErrorComponent />
            </Container>
          </Article>
        </Main>
      </>
    );
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
            getId={(item) => item.id}
            getLink={(item) => `/genre/${item.id}/movie`}
            renderItem={(item) => item.name}
            variant='comma-separated'
          />
        </Wrapper>
        <UserScore rating={votes} />
        <Overview text={data?.overview} />
      </Header>
      <Main>
        <Article name='Collection movies'>
          <Container>
            <H2 heading='Movies in collection' />
            <BodyText text={`Showing ${data?.parts.length} movies`} />
            <Cards
              variant='list'
              data={data?.parts}
              getId={(item) => item.id}
              getLink={(item) => `/movies/${item.id}`}
              renderContent={(item) => (
                <>
                  <ImageComponent
                    src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                    fallback='/images/error_500x750.webp'
                    alt={item.title}
                  />
                  <CardContent vote={item.vote_average} heading={item.title}>
                    <BodyText
                      text={
                        item.release_date
                          ? formatDate(item.release_date)
                          : 'TBC'
                      }
                    />
                  </CardContent>
                </>
              )}
              sort={(a, b) =>
                (b.release_date ? +new Date(b.release_date) : 0) -
                (a.release_date ? +new Date(a.release_date) : 0)
              }
            />
          </Container>
        </Article>
      </Main>
    </>
  );
}
