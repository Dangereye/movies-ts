import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Article from '../components/articles/Article';
import CardContent from '../components/cards/card/CardContent';
import Cards from '../components/cards/Cards';
import Container from '../components/container/Container';
import Header from '../components/header/Header';
import ImageComponent from '../components/image/Image';
import Layout from '../components/layout/Layout';
import Main from '../components/main/Main';
import Navigation from '../components/navigation/Navigation';
import Sidebar from '../components/sidebar/Sidebar';
import SubNavbar from '../components/sub_navbar/SubNavbar';
import BodyText from '../components/typography/BodyText';
import H2 from '../components/typography/H2';
import { moviePages } from '../data/moviePages';
import useCreateGenres from '../hooks/useCreateGenres';
import useMakeQuery from '../hooks/useMakeQuery';
import { IMovieMin } from '../interfaces/IMovieMin';
import { IPage } from '../interfaces/IPage';
import { formatDate } from '../utilities/formatDate';

export default function MovieGenre() {
  const { genreId } = useParams();
  const [genre, setGenre] = useState<string | null>(null);

  const {
    data: movie,
    isError,
    isLoading,
  } = useMakeQuery<IPage<IMovieMin>>(
    `movie-genre-${genreId}`,
    `discover/movie`,
    `&with_genres=${genreId}`
  );

  const genres = useCreateGenres('movie-genres', 'genre/movie/list');

  useEffect(() => {
    genres?.find((g) => {
      if (`${g.id}` === genreId) {
        setGenre(g.name);
      }
    });
  }, [genreId, genres, genre]);

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
          data={moviePages}
          getId={(item) => item.name}
          getLink={(item) => item.link}
          renderItem={(item) => item.name}
          variant='horizontal'
        />
      </SubNavbar>
      <Header variant='header__min' title={`${genre} movies`} />
      <Article name='genre-movies'>
        <Container>
          <Layout variant='grid grid--sidebar'>
            <Sidebar />
            <Main>
              <Cards
                variant='list'
                data={movie?.results}
                getId={(item) => item.id}
                getLink={(item) => `/movies/${item?.id}`}
                renderContent={(item) => (
                  <>
                    <ImageComponent
                      src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                      fallback='/images/error_500x750.webp'
                      alt={item.title}
                    />
                    <CardContent heading={item.title}>
                      <BodyText text={`${formatDate(item.release_date)}`} />
                    </CardContent>
                  </>
                )}
              />
            </Main>
          </Layout>
        </Container>
      </Article>
    </>
  );
}
