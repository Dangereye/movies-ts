import { useParams } from "react-router-dom";
import Article from "../components/articles/Article";
import Container from "../components/container/Container";
import CrewJobs from "../components/header/CrewJobs";
import Header from "../components/header/Header";
import Overview from "../components/header/Overview";
import ImageComponent from "../components/image/Image";
import Navigation from "../components/navigation/Navigation";
import StarRating from "../components/star_rating/StarRating";
import SubNavbar from "../components/sub_navbar/SubNavbar";
import BodyText from "../components/typography/BodyText";
import H2 from "../components/typography/H2";
import HDiv from "../components/typography/HDiv";
import SmallText from "../components/typography/SmallText";
import Wrapper from "../components/wrapper/Wrapper";
import { tvPages } from "../data/tvPages";
import useMakeQuery from "../hooks/useMakeQuery";
import { ISeason } from "../interfaces/ISeason";
import { ITVShowFull } from "../interfaces/ITVShowFull";
import { formatDate } from "../utilities/formatDate";
import { formatRuntime } from "../utilities/formatRuntime";

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
    return <H2 heading="Loading" />;
  }

  if (isError || tvIsError) {
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
        variant="header__full"
        bgImage={tv?.backdrop_path}
        image={season?.poster_path}
        alt={season?.name}
        title={season?.name}
      >
        <Wrapper name="info-bar" variant="flex">
          <BodyText text={formatDate(season?.air_date)} />
          <Navigation
            data={tv?.genres}
            getID={(item) => item.id}
            getLink={(item) => `/genre/${item.id}`}
            renderItem={(item) => item.name}
            variant="comma-separated"
          />
        </Wrapper>
        <Overview text={season?.overview} />
        <CrewJobs credits={season?.credits} />
      </Header>
      <Article name="season-episodes">
        <Container>
          <H2 heading="Episodes" />
          <div className="episodes">
            {season?.episodes.map((episode) => (
              <div className="episode" key={episode.id}>
                <ImageComponent
                  src={`https://image.tmdb.org/t/p/w500/${episode.still_path}`}
                  width={539}
                  height={303}
                  alt={episode.name}
                  fallback="/images/error_1039x584.webp"
                />
                <div className="content">
                  <Wrapper name="episode-header" variant="flex">
                    <HDiv
                      variant="heading--h4"
                      heading={`${episode.episode_number}. ${episode.name}`}
                    />
                    <BodyText text={formatRuntime(episode.runtime)} />
                  </Wrapper>
                  <SmallText
                    variant="episode-date"
                    text={formatDate(episode.air_date)}
                  />
                  <BodyText text={episode.overview} />
                  <Wrapper name="episode-votes" variant="flex">
                    <StarRating rating={episode.vote_average} />
                    <SmallText
                      variant="season-vote-count"
                      text={`${episode.vote_count} votes`}
                    />
                  </Wrapper>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Article>
    </>
  );
}
