// React router
import { Link, useParams } from 'react-router-dom';

// Hooks
import useMakeQuery from '../hooks/useMakeQuery';

// Interfaces
import { ITVShowFull } from '../interfaces/ITVShowFull';
import { ISeason } from '../interfaces/ISeason';

// Components
import Main from '../components/main/Main';
import LoaderComponent from '../components/loader/Loader';
import ErrorComponent from '../components/error/Error';
import Header from '../components/header/Header';
import Overview from '../components/header/Overview';
import Navigation from '../components/navigation/Navigation';
import SubNavbar from '../components/sub_navbar/SubNavbar';
import Wrapper from '../components/wrapper/Wrapper';
import Section from '../components/sections/Section';
import Cards from '../components/cards/Cards';
import IconText from '../components/typography/IconText';
import Certificate from '../components/header/Certificate';
import TopBilledCrew from '../components/header/top_billed_crew/TopBilledCrew';

// Articles
import ArticleVideos from '../components/articles/ArticleVideos';
import ArticleSeasonEpisodes from '../components/articles/ArticleSeasonEpisodes';

// Data
import { tvPages } from '../data/tvPages';

// Utilities
import { formatDate } from '../utilities/formatDate';
import { formatEpisodeCount } from '../utilities/formatEpisodeCount';
import { topBilledAggregateCrew } from '../utilities/topBilledAggregateCrew';

// Icons
import { RxCalendar } from 'react-icons/rx';

export default function TvSeason() {
  const { tvId, seasonId } = useParams();

  const {
    data: season,
    isError,
    isLoading,
  } = useMakeQuery<ISeason>(
    `season-${tvId}-${seasonId}`,
    `tv/${tvId}/season/${seasonId}`,
    `&append_to_response=credits,aggregate_credits,videos`
  );

  const {
    data: tv,
    isError: tvIsError,
    isLoading: tvIsLoading,
  } = useMakeQuery<ITVShowFull>(
    `tv-${tvId}`,
    `tv/${tvId}`,
    `&append_to_response=content_ratings`
  );

  if (isLoading || tvIsLoading) {
    return (
      <>
        <SubNavbar navigation={tvPages} />
        <LoaderComponent variant='header-full' />
      </>
    );
  }

  if (isError || tvIsError) {
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
        image={season?.poster_path}
        poster_sizes='w500'
        alt={season?.name}
        title={season?.name}
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
            text={formatDate(season?.air_date)}
          />
        </Wrapper>
        <Overview text={season?.overview} />
        <TopBilledCrew
          data={topBilledAggregateCrew(season?.aggregate_credits?.crew)}
        />
      </Header>
      <Section>
        <Main>
          <Cards
            article
            heading='top billed cast'
            media_type='people'
            variant='scroll-x'
            limit
            data={season?.aggregate_credits?.cast}
            getId={(item) => item.id}
            getLink={(item) => `/people/${item.id}`}
            getHeading={(item) => item.name}
            getImage={(item) => item.profile_path}
            profile_sizes='h632'
            getBodyText={(item) => item.roles[0].character}
            getSmallText={(item) =>
              formatEpisodeCount(item.total_episode_count)
            }
            sortItems={(a, b) => b.popularity - a.popularity}
            imageLoading='lazy'
          >
            <div className='buttons'>
              <Link
                to={`/tv/${tvId}/season/${seasonId}/cast-crew`}
                className='btn btn--tertiary'
              >
                View all cast & crew
              </Link>
            </div>
          </Cards>

          <ArticleVideos data={season?.videos?.results} />
          <ArticleSeasonEpisodes data={season?.episodes} />
        </Main>
      </Section>
    </>
  );
}
