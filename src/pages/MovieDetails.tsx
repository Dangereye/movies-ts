// React router
import { Link, useParams } from 'react-router-dom';

// Components
import LoaderComponent from '../components/loader/Loader';
import ErrorComponent from '../components/error/Error';
import SubNavbar from '../components/sub_navbar/SubNavbar';
import Header from '../components/header/Header';
import TopBilledCrew from '../components/header/top_billed_crew/TopBilledCrew';
import Overview from '../components/header/Overview';
import Navigation from '../components/navigation/Navigation';
import Wrapper from '../components/wrapper/Wrapper';
import Statistics from '../components/statistics/Statistics';
import Collection from '../components/collection/Collection';
import Certificate from '../components/header/Certificate';
import UserScore from '../components/header/UserScore';
import IconText from '../components/typography/IconText';
import Main from '../components/main/Main';
import Section from '../components/sections/Section';
import Cards from '../components/cards/Cards';

// Articles
import ArticleVideos from '../components/articles/ArticleVideos';
import ArticleImages from '../components/articles/ArticleImages';
import ArticleReviews from '../components/articles/ArticleReviews';

// Hooks
import useMakeQuery from '../hooks/useMakeQuery';
import useCreateImages from '../hooks/useCreateImages';

// Interfaces
import { IMovieFull } from '../interfaces/IMovieFull';

// Icons
import { RxCalendar, RxClock } from 'react-icons/rx';

// Data
import { moviePages } from '../data/moviePages';

// Utilities
import { formatDate } from '../utilities/formatDate';
import { formatRuntime } from '../utilities/formatRuntime';
import { topBilledCrew } from '../utilities/topBilledcrew';

export default function MovieDetails() {
  const { movieId } = useParams();

  const { data, isError, isLoading } = useMakeQuery<IMovieFull>(
    `movie-${movieId}`,
    `movie/${movieId}`,
    `&append_to_response=release_dates,credits,videos,external_ids,recommendations,similar,reviews,images`
  );

  const {} = useCreateImages(movieId, data?.images);

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
        alt={data?.title}
        title={data?.title}
        leadTitle='Movies'
      >
        <Wrapper name='info-bar' variant='flex'>
          <Certificate movie={data?.release_dates?.results} />
          <Navigation
            data={data?.genres}
            getId={(item) => item.id}
            getLink={(item) => `/genre/${item.id}/movie`}
            renderItem={(item) => item.name}
            variant='comma-separated'
          />
          <IconText
            name='release-date'
            icon={<RxCalendar />}
            text={formatDate(data?.release_date)}
          />
          <IconText
            name='run-time'
            icon={<RxClock />}
            text={formatRuntime(data?.runtime)}
          />
        </Wrapper>
        <UserScore rating={data?.vote_average} />
        <Overview caption={data?.tagline} text={data?.overview} />
        <TopBilledCrew data={topBilledCrew(data?.credits?.crew)} />
      </Header>
      <Statistics movie={data} />
      <Section>
        <Main>
          <Cards
            article
            heading='top billed cast'
            media_type='people'
            limit
            variant='scroll-x'
            data={data?.credits?.cast}
            getId={(item) => item.id}
            getLink={(item) => `/people/${item.id}`}
            getHeading={(item) => item.name}
            getImage={(item) => item.profile_path}
            getBodyText={(item) => item.character}
            sortItems={(a, b) => b.popularity - a.popularity}
          >
            <div className='buttons'>
              <Link
                to={`/movies/${movieId}/cast-crew`}
                className='btn btn--tertiary'
              >
                View all cast & crew
              </Link>
            </div>
          </Cards>

          <ArticleVideos data={data?.videos?.results} />
          <ArticleImages />

          <ArticleReviews data={data?.reviews?.results} />
          <Collection
            name={data?.belongs_to_collection?.name}
            image={data?.belongs_to_collection?.backdrop_path}
            id={data?.belongs_to_collection?.id}
          />
          <Cards
            article
            heading='recommended'
            media_type='movies'
            variant='scroll-x'
            data={data?.recommendations?.results}
            getId={(item) => item.id}
            getLink={(item) => `/movies/${item.id}`}
            getHeading={(item) => item.title}
            getImage={(item) => item.poster_path}
            getVotes={(item) => item.vote_average}
            getBodyText={(item) => formatDate(item.release_date)}
            sortItems={(a, b) => b.popularity - a.popularity}
          />
          <Cards
            article
            heading='you may also enjoy'
            media_type='movies'
            variant='scroll-x'
            data={data?.similar?.results}
            getId={(item) => item.id}
            getLink={(item) => `/movies/${item.id}`}
            getHeading={(item) => item.title}
            getImage={(item) => item.poster_path}
            getVotes={(item) => item.vote_average}
            getBodyText={(item) => formatDate(item.release_date)}
            sortItems={(a, b) => b.popularity - a.popularity}
          />
        </Main>
      </Section>
    </>
  );
}
