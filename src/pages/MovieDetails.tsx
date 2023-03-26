import { useParams } from "react-router-dom";

// Components
import SubNavbar from "../components/sub_navbar/SubNavbar";
import Header from "../components/header/Header";
import Overview from "../components/header/Overview";
import Navigation from "../components/navigation/Navigation";
import H2 from "../components/typography/H2";
import Wrapper from "../components/wrapper/Wrapper";
import CrewJobs from "../components/header/CrewJobs";
import Statistics from "../components/statistics/Statistics";
import Collection from "../components/collection/Collection";
import Certificate from "../components/header/Certificate";
import UserScore from "../components/header/UserScore";
import IconText from "../components/typography/IconText";

// Articles
import ArticlePeopleScrollX from "../components/articles/ArticlePeopleScrollX";
import ArticleVideos from "../components/articles/ArticleVideos";
import ArticleReviews from "../components/articles/ArticleReviews";
import ArticleMoviesMin from "../components/articles/ArticleMoviesMin";

// Hooks
import useMakeQuery from "../hooks/useMakeQuery";

// Interfaces
import { IMovieFull } from "../interfaces/IMovieFull";

// Icons
import { RxCalendar, RxClock } from "react-icons/rx";

// Data
import { moviePages } from "../data/moviePages";
import { formatDate } from "../utilities/formatDate";
import { formatRuntime } from "../utilities/formatRuntime";
import ArticlePeople from "../components/articles/ArticlePeople";

export default function MovieDetails() {
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
      <Header
        variant="header__full"
        bgImage={movie?.backdrop_path}
        image={movie?.poster_path}
        alt={movie?.title}
        title={movie?.title}
      >
        <Wrapper name="info-bar" variant="flex">
          <Certificate movie={movie?.release_dates.results} />
          <Navigation
            data={movie?.genres}
            getID={(item) => item.id}
            getLink={(item) => `/genre/${item.id}/movie`}
            renderItem={(item) => item.name}
            variant="comma-separated"
          />
          <IconText
            name="release-date"
            icon={<RxCalendar />}
            text={formatDate(movie?.release_date)}
          />
          <IconText
            name="run-time"
            icon={<RxClock />}
            text={formatRuntime(movie?.runtime)}
          />
        </Wrapper>
        <UserScore rating={movie?.vote_average} />
        <Overview caption={movie?.tagline} text={movie?.overview} />
        <CrewJobs credits={movie?.credits} />
      </Header>
      <Statistics movie={movie} />
      
      <ArticlePeople variant="scroll-x" name="top-billed-cast"heading="Top billed cast"data={movie?.credits.cast} character limit/>
      <ArticleVideos data={movie?.videos.results} />
      <ArticleReviews data={movie?.reviews.results} />
      <Collection
        name={movie?.belongs_to_collection?.name}
        image={movie?.belongs_to_collection?.backdrop_path}
        id={movie?.belongs_to_collection?.id}
      />
      <ArticleMoviesMin variant="scroll-x" name="recommended-movies" heading="Recommended" data={movie?.recommendations.results}/>
      <ArticleMoviesMin variant="scroll-x" name="similar-movies" heading="You may also enjoy..." data={movie?.similar.results}/>
      
    </>
  );
}
