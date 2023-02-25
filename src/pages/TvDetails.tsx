import { useParams } from "react-router-dom";

// Components
import Header from "../components/header/Header";
import Overview from "../components/header/Overview";
import VoteCountPercentage from "../components/vote_count_percentage/VoteCountPercentage";
import Navigation from "../components/navigation/Navigation";
import BodyText from "../components/typography/BodyText";
import H2 from "../components/typography/H2";
import HDiv from "../components/typography/HDiv";
import Wrapper from "../components/wrapper/Wrapper";
import CrewJobs from "../components/header/CrewJobs";
import Container from "../components/container/Container";
import Article from "../components/articles/Article";
import Cards from "../components/cards/Cards";
import ImageComponent from "../components/image/Image";
import CardContent from "../components/cards/card/CardContent";
import Statistics from "../components/statistics/Statistics";
import SubNavbar from "../components/sub_navbar/SubNavbar";

// Hooks
import useMakeQuery from "../hooks/useMakeQuery";

// Interfaces
import { ITVShowFull } from "../interfaces/ITVShowFull";
import { IAggregateCast } from "../interfaces/IAggregateCast";

// Utilities
import { formatDate } from "../utilities/formatDate";

// Data
import { tvPages } from "../data/tvPages";
import ArticleVideos from "../components/articles/ArticleVideos";
import ArticleReviews from "../components/articles/ArticleReviews";

export default function TvDetails() {
  const { tvId } = useParams();
  const {
    data: tv,
    isError,
    isLoading,
  } = useMakeQuery<ITVShowFull>(
    `tv-${tvId}`,
    `tv/${tvId}`,
    `&append_to_response=credits,aggregate_credits,external_ids,videos,reviews,recommendations,similar`
  );

  if (isLoading) {
    return <H2 heading="Loading" />;
  }

  if (isError) {
    return <H2 heading="Error" />;
  }

  return (
    <>
      <SubNavbar>
        <Navigation
          data={tvPages}
          getID={(item) => item.name}
          getLink={(item) => item.link}
          renderItem={(item) => item.name}
          variant="horizontal"
        />
      </SubNavbar>
      <Header
        bgImage={tv?.backdrop_path}
        image={tv?.poster_path}
        alt={tv?.name}
        title={tv?.name}
      >
        <Wrapper name="info-bar" variant="flex">
          <BodyText text={formatDate(tv?.first_air_date)} />
          <Navigation
            data={tv?.genres}
            getID={(item) => item.id}
            getLink={(item) => `/genre/${item.id}`}
            renderItem={(item) => item.name}
            variant="comma-separated"
          />
        </Wrapper>
        <Wrapper name="actions" variant="flex">
          <div className="vote">
            <VoteCountPercentage vote={tv?.vote_average} large />
            <HDiv variant="heading--h4" heading="user score" />
          </div>
        </Wrapper>
        <Overview caption={tv?.tagline} text={tv?.overview} />
        <CrewJobs credits={tv?.credits} />
      </Header>
      <Statistics tv={tv} />
      <Article name="article__series-cast">
        <Container>
          <H2 heading="Top billed cast" />
          <Cards
            getID={(item: IAggregateCast) => item.id}
            renderLink={(item: IAggregateCast) => `/people/${item.id}`}
            renderItem={(item: IAggregateCast) => (
              <>
                <ImageComponent
                  src={`https://image.tmdb.org/t/p/w500/${item.profile_path}`}
                  fallback="/images/error_500x750.webp"
                  alt={item.name}
                />
                <CardContent
                  heading={item.name}
                  body={item.roles[0].character}
                />
              </>
            )}
            data={tv?.aggregate_credits.cast}
            sort={(a, b) => b.popularity - a.popularity}
            limit
          />
        </Container>
      </Article>
      <ArticleVideos data={tv?.videos.results} />
      <ArticleReviews data={tv?.reviews.results} />
      <Article name="tv-show-seasons">
        <Container>
          <H2 heading="Seasons" />
          <Cards
            getID={(item) => item.id}
            renderLink={(item) => `/tv/${tvId}/season/${item.season_number}`}
            renderItem={(item) => (
              <>
                <ImageComponent
                  src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                  fallback="/images/error_500x750.webp"
                  alt={item.name}
                />
                <CardContent
                  heading={item.name}
                  body={formatDate(item.air_date)}
                />
              </>
            )}
            data={tv?.seasons}
          />
        </Container>
      </Article>
      {/* <ArticleTVShowsScrollX
        name="recommended-tv-shows"
        heading="Recommended"
        data={tv?.recommendations.results}
      />
      <ArticleTVShowsScrollX
        name="similar-tv-shows"
        heading="You may also enjoy..."
        data={tv?.similar.results}
      /> */}
    </>
  );
}
