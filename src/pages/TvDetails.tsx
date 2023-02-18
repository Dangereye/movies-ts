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

// Hooks
import useMakeQuery from "../hooks/useMakeQuery";

// Interfaces
import { ITVShow } from "../interfaces/ITVShow";

// Utilities
import { formatDate } from "../utilities/formatDate";
import Container from "../components/container/Container";
import Article from "../components/articles/Article";
import Cards from "../components/cards/Cards";
import { IAggregateCast } from "../interfaces/IAggregateCast";
import ImageComponent from "../components/image/Image";
import CardContent from "../components/cards/card/CardContent";

export default function TvDetails() {
  const { tvId } = useParams();
  const {
    data: tv,
    isError,
    isLoading,
  } = useMakeQuery<ITVShow>(
    `tv-${tvId}`,
    `tv/${tvId}`,
    `&append_to_response=credits,aggregate_credits`
  );

  if (isLoading) {
    return <H2 heading="Loading" />;
  }

  if (isError) {
    return <H2 heading="Error" />;
  }

  return (
    <>
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
      <Article name="article__series-cast">
        <Container>
          <H2 heading="Series cast" />
          <Cards
            getID={(item: IAggregateCast) => item.id}
            renderLink={(item: IAggregateCast) => `/person/${item.id}`}
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
    </>
  );
}
