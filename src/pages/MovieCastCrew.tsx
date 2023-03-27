import { useParams } from 'react-router-dom';

// Components
import Article from '../components/articles/Article';
import CardContent from '../components/cards/card/CardContent';
import Cards from '../components/cards/Cards';
import Container from '../components/container/Container';
import ImageComponent from '../components/image/Image';
import Navigation from '../components/navigation/Navigation';
import SubNavbar from '../components/sub_navbar/SubNavbar';
import BodyText from '../components/typography/BodyText';
import H1 from '../components/typography/H1';
import H2 from '../components/typography/H2';

// Data
import { moviePages } from '../data/moviePages';

// Hooks
import useMakeQuery from '../hooks/useMakeQuery';

// Interfaces
import { ICast } from '../interfaces/ICast';
import { ICrew } from '../interfaces/ICrew';
import { IMovieFull } from '../interfaces/IMovieFull';

export default function MovieCastCrew() {
  const { movieId } = useParams();

  const {
    data: movie,
    isError,
    isLoading,
  } = useMakeQuery<IMovieFull>(
    `movie-${movieId}`,
    `movie/${movieId}`,
    `&append_to_response=release_dates,credits,videos,external_ids,recommendations,similar,reviews`
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
          data={moviePages}
          getID={(item) => item.name}
          getLink={(item) => item.link}
          renderItem={(item) => item.name}
          variant='horizontal'
        />
      </SubNavbar>
      <header className='header'>
        <Container>
          <H1 heading='Cast & crew' />
        </Container>
      </header>
      <Article name='Cast'>
        <Container>
          <H2 heading={`Cast ${movie?.credits.cast.length}`} />
          <Cards
            variant='list'
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
                  <BodyText text={`${item.character}`} />
                </CardContent>
              </>
            )}
            data={movie?.credits?.cast}
            sort={(a: ICast, b: ICast) => b.popularity - a.popularity}
          />
        </Container>
      </Article>
      <Article name='crew'>
        <Container>
          <H2 heading={`Crew ${movie?.credits?.crew?.length}`} />
          <Cards
            variant='list'
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
                  <BodyText text={`${item.department}`} />
                  <BodyText text={`${item.job}`} />
                </CardContent>
              </>
            )}
            data={movie?.credits?.crew}
            sort={(a: ICrew, b: ICrew) => b.popularity - a.popularity}
          />
        </Container>
      </Article>
    </>
  );
}
