// React router
import { Link, useParams } from 'react-router-dom';

// Components
import Header from '../components/header/Header';
import Certificate from '../components/header/Certificate';
import UserScore from '../components/header/UserScore';
import Overview from '../components/header/Overview';
import TopBilledCrew from '../components/header/top_billed_crew/TopBilledCrew';
import Navigation from '../components/navigation/Navigation';
import Wrapper from '../components/wrapper/Wrapper';
import Statistics from '../components/statistics/Statistics';
import SubNavbar from '../components/sub_navbar/SubNavbar';
import IconText from '../components/typography/IconText';
import Cards from '../components/cards/Cards';
import Main from '../components/main/Main';
import LoaderComponent from '../components/loader/Loader';
import ErrorComponent from '../components/error/Error';
import Section from '../components/sections/Section';

// Hooks
import useMakeQuery from '../hooks/useMakeQuery';
import useCreateImages from '../hooks/useCreateImages';

// Interfaces
import { ITVShowFull } from '../interfaces/ITVShowFull';

// Utilities
import { formatDate } from '../utilities/formatDate';

// Articles
import ArticleVideos from '../components/articles/ArticleVideos';
import ArticleReviews from '../components/articles/ArticleReviews';
import ArticleImagesScrollX from '../components/articles/ArticleImagesScrollX';

// Data
import { tvPages } from '../data/tvPages';

// Icons
import { RxCalendar } from 'react-icons/rx';

// Utilities
import { formatEpisodeCount } from '../utilities/formatEpisodeCount';
import { stringToDate } from '../utilities/stringToDate';
import { topBilledAggregateCrew } from '../utilities/topBilledAggregateCrew';

export default function TvDetails() {
  const { tvId } = useParams();

  const {
    data: tv,
    isError,
    isLoading,
  } = useMakeQuery<ITVShowFull>(
    `tv-${tvId}`,
    `tv/${tvId}`,
    `&append_to_response=credits,aggregate_credits,external_ids,videos,reviews,recommendations,similar,content_ratings,images`
  );

  useCreateImages(tvId, tv?.images);

  if (isLoading) {
    return (
      <>
        <SubNavbar navigation={tvPages} />
        <LoaderComponent variant='header-full' />
      </>
    );
  }

  if (isError) {
    return (
      <>
        <SubNavbar navigation={tvPages} />
        <ErrorComponent variant='section' />
      </>
    );
  }

  return (
    <>
      <SubNavbar navigation={tvPages} />
      <Header
        variant='header__full'
        bgImage={tv?.backdrop_path}
        image={tv?.poster_path}
        alt={tv?.name}
        title={tv?.name}
        leadTitle='TV Shows'
      >
        <Wrapper name='info-bar' variant='flex'>
          <Certificate tv={tv?.content_ratings?.results} />
          <Navigation
            data={tv?.genres}
            getId={(item) => item.id}
            getLink={(item) => `/genre/${item.id}/tv`}
            renderItem={(item) => item.name}
            variant='comma-separated'
          />
          <IconText
            name='first-air-date'
            icon={<RxCalendar />}
            text={formatDate(tv?.first_air_date)}
          />
        </Wrapper>
        <UserScore rating={tv?.vote_average} />
        <Overview caption={tv?.tagline} text={tv?.overview} />
        <TopBilledCrew
          data={topBilledAggregateCrew(tv?.aggregate_credits?.crew)}
        />
      </Header>
      <Statistics data={tv} />
      <Section>
        <Main>
          <Cards
            article
            heading='top billed cast'
            media_type='TV shows'
            limit
            variant='scroll-x'
            data={tv?.aggregate_credits?.cast}
            getId={(item) => item.id}
            getLink={(item) => `/people/${item.id}`}
            getHeading={(item) => item.name}
            getImage={(item) => item.profile_path}
            getRoles={(item) => item.roles}
            getSmallText={(item) =>
              formatEpisodeCount(item.total_episode_count)
            }
            sortItems={(a, b) => b.popularity - a.popularity}
          >
            <div className='buttons'>
              <Link to={`/tv/${tvId}/cast-crew`} className='btn btn--tertiary'>
                View all cast & crew
              </Link>
            </div>
          </Cards>

          <ArticleVideos data={tv?.videos?.results} />
          <ArticleImagesScrollX />
          <ArticleReviews data={tv?.reviews?.results} />
          <Cards
            article
            heading='seasons'
            media_type='TV shows'
            variant='scroll-x'
            data={tv?.seasons}
            getId={(item) => item.id}
            getLink={(item) => `/tv/${tvId}/season/${item.season_number}`}
            getHeading={(item) => item.name}
            getImage={(item) => item.poster_path}
            getBodyText={(item) => formatDate(item.air_date)}
            getSmallText={(item) => formatEpisodeCount(item.episode_count)}
            sortItems={(a, b) =>
              stringToDate(b.air_date) - stringToDate(a.air_date)
            }
          />
          <Cards
            article
            heading='recommended'
            media_type='TV shows'
            variant='scroll-x'
            data={tv?.recommendations?.results}
            getId={(item) => item.id}
            getLink={(item) => `/tv/${item.id}`}
            getHeading={(item) => item.name}
            getImage={(item) => item.poster_path}
            getVotes={(item) => item.vote_average}
            getBodyText={(item) => formatDate(item.first_air_date)}
            sortItems={(a, b) => b.popularity - a.popularity}
          />
          <Cards
            article
            heading='you may also enjoy'
            media_type='TV shows'
            variant='scroll-x'
            data={tv?.similar?.results}
            getId={(item) => item.id}
            getLink={(item) => `/tv/${item.id}`}
            getHeading={(item) => item.name}
            getImage={(item) => item.poster_path}
            getVotes={(item) => item.vote_average}
            getBodyText={(item) => formatDate(item.first_air_date)}
            sortItems={(a, b) => b.popularity - a.popularity}
          />
        </Main>
      </Section>
    </>
  );
}
