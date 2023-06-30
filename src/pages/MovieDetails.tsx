// React router
import { useParams } from 'react-router-dom';

// Components
import LoaderComponent from '../components/loader/Loader';
import ErrorComponent from '../components/error/Error';
import SubNavbar from '../components/sub_navbar/SubNavbar';
import Header from '../components/header/Header';
import Overview from '../components/header/Overview';
import Navigation from '../components/navigation/Navigation';
import Wrapper from '../components/wrapper/Wrapper';
import CrewJobs from '../components/header/CrewJobs';
import Statistics from '../components/statistics/Statistics';
import Collection from '../components/collection/Collection';
import Certificate from '../components/header/Certificate';
import UserScore from '../components/header/UserScore';
import IconText from '../components/typography/IconText';
import Main from '../components/main/Main';
import Article from '../components/articles/Article';
import Container from '../components/container/Container';

// Articles
import ArticleVideos from '../components/articles/ArticleVideos';
import ArticleReviews from '../components/articles/ArticleReviews';
import ArticleMoviesMin from '../components/articles/ArticleMoviesMin';
import ArticlePeople from '../components/articles/ArticlePeople';

// Hooks
import useMakeQuery from '../hooks/useMakeQuery';

// Interfaces
import { IMovieFull } from '../interfaces/IMovieFull';

// Icons
import { RxCalendar, RxClock } from 'react-icons/rx';

// Data
import { moviePages } from '../data/moviePages';

// Utilities
import { formatDate } from '../utilities/formatDate';
import { formatRuntime } from '../utilities/formatRuntime';

export default function MovieDetails() {
  const { movieId } = useParams();
  const test = true;

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
        <Main>
          <Article name='Loading'>
            <Container>
              <LoaderComponent />
            </Container>
          </Article>
        </Main>
      </>
    );
  }

  if (isError || test) {
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
        <Main>
          <Article name='Error'>
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
      <SubNavbar>
        <Navigation
          data={moviePages}
          getId={(item) => item.name}
          getLink={(item) => item.link}
          renderItem={(item) => item.name}
          variant='horizontal'
        />
      </SubNavbar>
      <Header
        variant='header__full'
        bgImage={movie?.backdrop_path}
        image={movie?.poster_path}
        alt={movie?.title}
        title={movie?.title}
      >
        <Wrapper name='info-bar' variant='flex'>
          <Certificate movie={movie?.release_dates?.results} />
          <Navigation
            data={movie?.genres}
            getId={(item) => item.id}
            getLink={(item) => `/genre/${item.id}/movie`}
            renderItem={(item) => item.name}
            variant='comma-separated'
          />
          <IconText
            name='release-date'
            icon={<RxCalendar />}
            text={formatDate(movie?.release_date)}
          />
          <IconText
            name='run-time'
            icon={<RxClock />}
            text={formatRuntime(movie?.runtime)}
          />
        </Wrapper>
        <UserScore rating={movie?.vote_average} />
        <Overview caption={movie?.tagline} text={movie?.overview} />
        <CrewJobs credits={movie?.credits} />
      </Header>
      <Statistics movie={movie} />
      <Main>
        <ArticlePeople
          variant='scroll-x'
          name='top-billed-cast'
          heading='Top billed cast'
          data={movie?.credits?.cast}
          character
          limit
        />

        <ArticleVideos data={movie?.videos?.results} />
        <ArticleReviews data={movie?.reviews?.results} />
        <Collection
          name={movie?.belongs_to_collection?.name}
          image={movie?.belongs_to_collection?.backdrop_path}
          id={movie?.belongs_to_collection?.id}
        />
        <ArticleMoviesMin
          variant='scroll-x'
          name='recommended-movies'
          heading='Recommended'
          data={movie?.recommendations?.results}
        />
        <ArticleMoviesMin
          variant='scroll-x'
          name='similar-movies'
          heading='You may also enjoy...'
          data={movie?.similar?.results}
        />
      </Main>
    </>
  );
}
