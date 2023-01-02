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
import { IMovie } from "../interfaces/IMovie";

// Utilities
import { formatDate } from "../utilities/formatDate";
import { formatRuntime } from "../utilities/formatRuntime";

export default function MovieDetails() {
  const { movieId } = useParams();
  const {
    data: movie,
    isError,
    isLoading,
  } = useMakeQuery<IMovie>(
    `movie-${movieId}`,
    `movie/${movieId}`,
    `&append_to_response=release_dates,credits`
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
        bgImage={movie?.backdrop_path}
        image={movie?.poster_path}
        alt={movie?.title}
        title={movie?.title}
      >
        <Wrapper name="info-bar" variant="flex">
          <BodyText text={formatDate(movie?.release_date)} />
          <Navigation
            data={movie?.genres}
            getID={(item) => item.id}
            getLink={(item) => `/genre/${item.id}`}
            renderItem={(item) => item.name}
            variant="comma-separated"
          />
          <BodyText text={formatRuntime(movie?.runtime)} />
        </Wrapper>
        <Wrapper name="actions" variant="flex">
          <div className="vote">
            <VoteCountPercentage vote={movie?.vote_average} size="header" />
            <HDiv variant="heading--h4" heading="user score" />
          </div>
        </Wrapper>
        <Overview caption={movie?.tagline} text={movie?.overview} />
        <CrewJobs credits={movie?.credits} />
      </Header>
    </>
  );
}
