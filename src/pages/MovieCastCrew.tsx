import { useParams } from "react-router-dom";
import Container from "../components/container/Container";
import CrewJobs from "../components/header/CrewJobs";
import Header from "../components/header/Header";
import Overview from "../components/header/Overview";
import Navigation from "../components/navigation/Navigation";
import SubNavbar from "../components/sub_navbar/SubNavbar";
import BodyText from "../components/typography/BodyText";
import H1 from "../components/typography/H1";
import H2 from "../components/typography/H2";
import HDiv from "../components/typography/HDiv";
import VoteCountPercentage from "../components/vote_count_percentage/VoteCountPercentage";
import Wrapper from "../components/wrapper/Wrapper";
import { moviePages } from "../data/moviePages";
import useMakeQuery from "../hooks/useMakeQuery";
import { IMovieFull } from "../interfaces/IMovieFull";
import { formatDate } from "../utilities/formatDate";
import { formatRuntime } from "../utilities/formatRuntime";
export default function MovieCastCrew() {
  const { movieId } = useParams();

  const {
    data: movie,
    isError,
    isLoading,
  } = useMakeQuery<IMovieFull>(
    `movie-${movieId}`,
    `movie/${movieId}`,
    `&append_to_response=release_dates,credits,videos,external_ids,recommendations,similar,reviews`
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
          data={moviePages}
          getID={(item) => item.name}
          getLink={(item) => item.link}
          renderItem={(item) => item.name}
          variant="horizontal"
        />
      </SubNavbar>
      <header className="header">
        <Container>
          <H1 heading={`${movie?.title} cast & crew`} />
        </Container>
      </header>
    </>
  );
}
