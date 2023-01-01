import { Link, useParams } from "react-router-dom";

// Components
import Article from "../components/article/Article";
import Container from "../components/container/Container";
import Header from "../components/header/Header";
import HeaderOverview from "../components/header/HeaderOverview";
import ImageComponent from "../components/image/Image";
import VoteCountPercentage from "../components/vote_count_percentage/VoteCountPercentage";
import Main from "../components/main/Main";
import Navigation from "../components/navigation/Navigation";
import BodyText from "../components/typography/BodyText";
import H1 from "../components/typography/H1";
import H2 from "../components/typography/H2";
import HDiv from "../components/typography/HDiv";
import { Wrapper } from "../components/wrapper/Wrapper";
import CrewJobs from "../components/header/CrewJobs";

// Hooks
import useMakeQuery from "../hooks/useMakeQuery";

// Interfaces
import { IMovie } from "../interfaces/IMovie";
import { formatDate } from "../utilities/formatDate";
import { formatRuntime } from "../utilities/formatRuntime";
import BackgroundImage from "../components/background_image/BackgroundImage";

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
      <Header>
        <BackgroundImage
          path={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
        />
        <Container>
          <ImageComponent
            src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
            fallback="/images/error_500x750.webp"
            width={500}
            height={750}
            alt={movie?.title}
          />
          <div className="header__content">
            <H1 heading={movie?.title} />
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
            <HeaderOverview caption={movie?.tagline} text={movie?.overview} />
            <CrewJobs credits={movie?.credits} />
          </div>
        </Container>
      </Header>
    </>
  );
}
