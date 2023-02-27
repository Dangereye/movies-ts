import { useParams } from "react-router-dom";
import CrewJobs from "../components/header/CrewJobs";
import Header from "../components/header/Header";
import Overview from "../components/header/Overview";
import Navigation from "../components/navigation/Navigation";
import SubNavbar from "../components/sub_navbar/SubNavbar";
import BodyText from "../components/typography/BodyText";
import H2 from "../components/typography/H2";
import HDiv from "../components/typography/HDiv";
import VoteCountPercentage from "../components/vote_count_percentage/VoteCountPercentage";
import Wrapper from "../components/wrapper/Wrapper";
import { tvPages } from "../data/tvPages";
import useMakeQuery from "../hooks/useMakeQuery";
import { ISeason } from "../interfaces/ISeason";
import { ITVShowFull } from "../interfaces/ITVShowFull";
import { formatDate } from "../utilities/formatDate";

export default function TvSeason() {
  const { tvId, seasonId } = useParams();

  const {
    data: season,
    isError,
    isLoading,
  } = useMakeQuery<ISeason>(
    `season-${tvId}-${seasonId}`,
    `tv/${tvId}/season/${seasonId}`,
    `&append_to_response=`
  );

  const {
    data: tv,
    isError: tvIsError,
    isLoading: tvIsLoading,
  } = useMakeQuery<ITVShowFull>(
    `tv-${tvId}`,
    `tv/${tvId}`,
    `&append_to_response=credits,aggregate_credits`
  );

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
          <BodyText text={`${season?.episodes.length} Episodes`} />
        </Wrapper>
        <Overview text={season?.overview} />
        <CrewJobs credits={season?.credits} />
      </Header>
    </>
  );
}
