// React router
import { useParams } from 'react-router-dom';

// Components
import Header from '../components/header/Header';
import Overview from '../components/header/Overview';
import Navigation from '../components/navigation/Navigation';
import BodyText from '../components/typography/BodyText';
import H2 from '../components/typography/H2';
import Wrapper from '../components/wrapper/Wrapper';
import CrewJobs from '../components/header/CrewJobs';
import Container from '../components/container/Container';
import ImageComponent from '../components/images/Image';
import CardContent from '../components/cards/card/CardContent';
import Statistics from '../components/statistics/Statistics';
import SubNavbar from '../components/sub_navbar/SubNavbar';
import Certificate from '../components/header/Certificate';
import UserScore from '../components/header/UserScore';
import IconText from '../components/typography/IconText';
import Cards from '../components/cards/Cards';
import Main from '../components/main/Main';
import LoaderComponent from '../components/loader/Loader';
import ErrorComponent from '../components/error/Error';
import Section from '../components/sections/Section';

// Hooks
import useMakeQuery from '../hooks/useMakeQuery';

// Interfaces
import { ITVShowFull } from '../interfaces/ITVShowFull';

// Utilities
import { formatDate } from '../utilities/formatDate';

// Articles
import Article from '../components/articles/Article';
import ArticleTvMin from '../components/articles/ArticleTvMin';
import ArticleVideos from '../components/articles/ArticleVideos';
import ArticleReviews from '../components/articles/ArticleReviews';
import ArticlePeople from '../components/articles/ArticlePeople';

// Data
import { tvPages } from '../data/tvPages';

// Icons
import { RxCalendar } from 'react-icons/rx';

export default function TvDetails() {
  const { tvId } = useParams();

  const {
    data: tv,
    isError,
    isLoading,
  } = useMakeQuery<ITVShowFull>(
    `tv-${tvId}`,
    `tv/${tvId}`,
    `&append_to_response=credits,aggregate_credits,external_ids,videos,reviews,recommendations,similar,content_ratings`
  );

  if (isLoading) {
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
        <LoaderComponent variant='header-full' />
      </>
    );
  }

  if (isError) {
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
        image={tv?.poster_path}
        alt={tv?.name}
        title={tv?.name}
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
        <CrewJobs credits={tv?.credits} />
      </Header>
      <Statistics tv={tv} />
      <Section>
        <Main>
          <ArticlePeople
            variant='scroll-x'
            name='tv-show-top-billed-cast'
            heading='Top billed cast'
            data={tv?.aggregate_credits?.cast}
            character
            limit
          />
          <ArticleVideos data={tv?.videos?.results} />
          <ArticleReviews data={tv?.reviews?.results} />
          <Article name='tv-show-seasons'>
            <Container>
              <H2 heading='Seasons' />
              <Cards
                variant='scroll-x'
                getId={(item) => item.id}
                getLink={(item) => `/tv/${tvId}/season/${item.season_number}`}
                renderContent={(item) => (
                  <>
                    <ImageComponent
                      src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                      fallback='/images/error_500x750.webp'
                      alt={item.name}
                    />
                    <CardContent heading={item.name}>
                      <BodyText
                        text={item.air_date ? formatDate(item.air_date) : 'TBC'}
                      />
                    </CardContent>
                  </>
                )}
                data={tv?.seasons}
                sort={(a, b) =>
                  (b.air_date ? +new Date(b.air_date) : 0) -
                  (a.air_date ? +new Date(a.air_date) : 0)
                }
              />
            </Container>
          </Article>
          <ArticleTvMin
            variant='scroll-x'
            name='recommended-tv-shows'
            heading='Recommended'
            data={tv?.recommendations?.results}
          />
          <ArticleTvMin
            variant='scroll-x'
            name='similar-tv-shows'
            heading='You may also enjoy...'
            data={tv?.similar?.results}
          />
        </Main>
      </Section>
    </>
  );
}
