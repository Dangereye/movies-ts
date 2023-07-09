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
import H2 from '../components/typography/H2';
import ImageComponent from '../components/image/Image';
import BodyText from '../components/typography/BodyText';

export default function MovieDetails() {
  const { movieId } = useParams();

  const { data, isError, isLoading } = useMakeQuery<IMovieFull>(
    `movie-${movieId}`,
    `movie/${movieId}`,
    `&append_to_response=release_dates,credits,videos,external_ids,recommendations,similar,reviews,images`
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

  if (isError) {
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
        bgImage={data?.backdrop_path}
        image={data?.poster_path}
        alt={data?.title}
        title={data?.title}
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
        <CrewJobs credits={data?.credits} />
      </Header>
      <Statistics movie={data} />
      <Main>
        <ArticlePeople
          variant='scroll-x'
          name='top-billed-cast'
          heading='Top billed cast'
          data={data?.credits?.cast}
          character
          limit
        />

        <ArticleVideos data={data?.videos?.results} />
        <Article name='posters'>
          <Container>
            <H2 heading='Movie posters' />
            <BodyText text={`Showing ${data?.images.posters.length} posters`} />
            <Wrapper name='posters' variant='scroll'>
              {data?.images.posters.map((img) => (
                <ImageComponent
                  src={`https://image.tmdb.org/t/p/w500/${img.file_path}`}
                  fallback='/images/error_500x750.webp'
                  width={500}
                  height={750}
                  alt='poster'
                />
              ))}
            </Wrapper>
          </Container>
        </Article>
        <Article name='backdrops'>
          <Container>
            <H2 heading='Movie backdrops' />
            <BodyText
              text={`Showing ${data?.images.backdrops.length} backdrops`}
            />
            <Wrapper name='posters' variant='scroll'>
              {data?.images.backdrops.map((img) => (
                <ImageComponent
                  src={`https://image.tmdb.org/t/p/w500/${img.file_path}`}
                  fallback='/images/error_500x750.webp'
                  width={600}
                  alt='poster'
                />
              ))}
            </Wrapper>
          </Container>
        </Article>
        <ArticleReviews data={data?.reviews?.results} />
        <Collection
          name={data?.belongs_to_collection?.name}
          image={data?.belongs_to_collection?.backdrop_path}
          id={data?.belongs_to_collection?.id}
        />
        <ArticleMoviesMin
          variant='scroll-x'
          name='recommended-movies'
          heading='Recommended'
          data={data?.recommendations?.results}
        />
        <ArticleMoviesMin
          variant='scroll-x'
          name='similar-movies'
          heading='You may also enjoy...'
          data={data?.similar?.results}
        />
      </Main>
    </>
  );
}
