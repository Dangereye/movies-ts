// React router
import { useParams } from 'react-router-dom';

// Hooks
import useMakeQuery from '../hooks/useMakeQuery';

// Interfaces
import { ITVShowFull } from '../interfaces/ITVShowFull';
import { ISeason } from '../interfaces/ISeason';

// Components
import Main from '../components/main/Main';
import LoaderComponent from '../components/loader/Loader';
import ErrorComponent from '../components/error/Error';
import Article from '../components/articles/Article';
import Container from '../components/container/Container';
import CrewJobs from '../components/header/CrewJobs';
import Header from '../components/header/Header';
import Overview from '../components/header/Overview';
import ImageComponent from '../components/images/Image';
import Navigation from '../components/navigation/Navigation';
import StarRating from '../components/star_rating/StarRating';
import SubNavbar from '../components/sub_navbar/SubNavbar';
import BodyText from '../components/typography/BodyText';
import H2 from '../components/typography/H2';
import HDiv from '../components/typography/HDiv';
import SmallText from '../components/typography/SmallText';
import Wrapper from '../components/wrapper/Wrapper';

// Data
import { tvPages } from '../data/tvPages';

// Utilities
import { formatDate } from '../utilities/formatDate';
import { formatRuntime } from '../utilities/formatRuntime';
import Section from '../components/sections/Section';

export default function TvSeason() {
  const { tvId, seasonId } = useParams();

  const {
    data: season,
    isError,
    isLoading,
  } = useMakeQuery<ISeason>(
    `season-${tvId}-${seasonId}`,
    `tv/${tvId}/season/${seasonId}`,
    `&append_to_response=credits,aggregate_credits`
  );

  const {
    data: tv,
    isError: tvIsError,
    isLoading: tvIsLoading,
  } = useMakeQuery<ITVShowFull>(`tv-${tvId}`, `tv/${tvId}`);

  if (isLoading || tvIsLoading) {
    return (
      <>
        <SubNavbar>
          <Navigation
            data={tvPages}
            getId={(item) => item.name}
            getLink={(item) => item.link}
            renderItem={(item) => item.name}
            variant='horizontal'
          />
        </SubNavbar>
        <Section>
          <Main>
            <Container>
              <LoaderComponent />
            </Container>
          </Main>
        </Section>
      </>
    );
  }

  if (isError || tvIsError) {
    return (
      <>
        <SubNavbar>
          <Navigation
            data={tvPages}
            getId={(item) => item.name}
            getLink={(item) => item.link}
            renderItem={(item) => item.name}
            variant='horizontal'
          />
        </SubNavbar>
        <Section>
          <Main>
            <Container>
              <ErrorComponent />
            </Container>
          </Main>
        </Section>
      </>
    );
  }

  return (
    <>
      <SubNavbar>
        <Navigation
          data={tvPages}
          getId={(item) => item.name}
          getLink={(item) => item.link}
          renderItem={(item) => item.name}
          variant='horizontal'
        />
      </SubNavbar>
      <Header
        variant='header__full'
        bgImage={tv?.backdrop_path}
        image={season?.poster_path}
        alt={season?.name}
        title={season?.name}
      >
        <Wrapper name='info-bar' variant='flex'>
          <BodyText text={formatDate(season?.air_date)} />
          <Navigation
            data={tv?.genres}
            getId={(item) => item.id}
            getLink={(item) => `/genre/${item.id}/tv`}
            renderItem={(item) => item.name}
            variant='comma-separated'
          />
        </Wrapper>
        <Overview text={season?.overview} />
        <CrewJobs credits={season?.credits} />
      </Header>
      <Section>
        <Main>
          <Article name='season-episodes'>
            <Container>
              <H2 heading='Episodes' />
              <div className='episodes'>
                {season?.episodes.map((episode) => (
                  <div className='episode' key={episode.id}>
                    <ImageComponent
                      src={`https://image.tmdb.org/t/p/w500/${episode.still_path}`}
                      width={539}
                      height={303}
                      alt={episode.name}
                      fallback='/images/error_1039x584.webp'
                    />
                    <div className='content'>
                      <Wrapper name='episode-header' variant='flex'>
                        <HDiv
                          variant='heading--h4'
                          heading={`${episode.episode_number}. ${episode.name}`}
                        />
                        <BodyText text={formatRuntime(episode.runtime)} />
                      </Wrapper>
                      <SmallText
                        variant='episode-date'
                        text={formatDate(episode.air_date)}
                      />
                      <BodyText text={episode.overview} />
                      <Wrapper name='episode-votes' variant='flex'>
                        <StarRating rating={episode.vote_average} />
                        <SmallText
                          variant='season-vote-count'
                          text={`${episode.vote_count} votes`}
                        />
                      </Wrapper>
                    </div>
                  </div>
                ))}
              </div>
            </Container>
          </Article>
        </Main>
      </Section>
    </>
  );
}
