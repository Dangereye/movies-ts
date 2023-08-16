// Components
import Header from '../components/header/Header';
import Searchbar from '../components/searchbar/SearchbarComponent';
import HDiv from '../components/typography/HDiv';
import Section from '../components/sections/Section';
import Main from '../components/main/Main';
import ErrorComponent from '../components/error/Error';
import LoaderComponent from '../components/loader/Loader';
import Cards from '../components/cards/Cards';

// Interfaces
import { IPage } from '../interfaces/IPage';
import { IMovieMin } from '../interfaces/IMovieMin';
import { IPerson } from '../interfaces/IPerson';
import { ITVShowMin } from '../interfaces/ITVShowMin';

// Hooks
import useMakeQuery from '../hooks/useMakeQuery';

// Utilities
import { formatDate } from '../utilities/formatDate';

export default function LandingPage() {
  const title = 'Ready to be entertained?';
  const heading =
    'Millions of movies, Tv shows and people to discover, explore now.';

  const {
    data: movies,
    isLoading: moviesIsLoading,
    isError: moviesIsError,
  } = useMakeQuery<IPage<IMovieMin>>('trending movies', 'trending/movie/week');

  const {
    data: tvshows,
    isLoading: tvshowsIsLoading,
    isError: tvshowsIsError,
  } = useMakeQuery<IPage<ITVShowMin>>('trending tvshows', 'trending/tv/week');

  const {
    data: people,
    isLoading: peopleIsLoading,
    isError: peopleIsError,
  } = useMakeQuery<IPage<IPerson>>('trending people', 'trending/person/week');

  if (moviesIsLoading || tvshowsIsLoading || peopleIsLoading) {
    return (
      <>
        <Header variant='header__center' title={title}>
          <HDiv variant='heading--h2' heading={heading} />
          <Searchbar fixed />
        </Header>
        <LoaderComponent variant='section' />
      </>
    );
  }

  if (moviesIsError || tvshowsIsError || peopleIsError) {
    return <ErrorComponent variant='section' />;
  }

  return (
    <>
      <Header
        variant='header__center'
        title={title}
        bgImage={movies?.results[0].backdrop_path}
      >
        <HDiv variant='heading--h2' heading={heading} />
        <Searchbar fixed />
      </Header>
      <Section>
        <Main>
          <Cards
            article
            heading='trending movies'
            media_type='movies'
            variant='scroll-x'
            data={movies?.results}
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
            heading='trending TV shows'
            media_type='TV shows'
            variant='scroll-x'
            data={tvshows?.results}
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
            heading='trending people'
            media_type='people'
            variant='scroll-x'
            data={people?.results}
            getId={(item) => item.id}
            getLink={(item) => `/people/${item.id}`}
            getHeading={(item) => item.name}
            getImage={(item) => item.profile_path}
            getVotes={(item) => undefined}
            getBodyText={(item) => item.known_for_department}
            sortItems={(a, b) => b.popularity - a.popularity}
          />
        </Main>
      </Section>
    </>
  );
}
