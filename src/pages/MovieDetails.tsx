import { useParams } from "react-router-dom";

// Components
import SubNavbar from "../components/sub_navbar/SubNavbar";
import Header from "../components/header/Header";
import Overview from "../components/header/Overview";
import VoteCountPercentage from "../components/vote_count_percentage/VoteCountPercentage";
import Navigation from "../components/navigation/Navigation";
import BodyText from "../components/typography/BodyText";
import H2 from "../components/typography/H2";
import HDiv from "../components/typography/HDiv";
import Wrapper from "../components/wrapper/Wrapper";
import CrewJobs from "../components/header/CrewJobs";
import Statistics from "../components/statistics/Statistics";
import Cards from "../components/cards/Cards";
import Article from "../components/articles/Article";
import Container from "../components/container/Container";
import ImageComponent from "../components/image/Image";
import CardContent from "../components/cards/card/CardContent";
import Collection from "../components/collection/Collection";

// Articles
import ArticleVideos from "../components/articles/ArticleVideos";
import ArticleMoviesScrollX from "../components/articles/ArticleMoviesScrollX";
import ArticleReviews from "../components/articles/ArticleReviews";

// Hooks
import useMakeQuery from "../hooks/useMakeQuery";

// Interfaces
import { IMovieFull } from "../interfaces/IMovieFull";
import { ICast } from "../interfaces/ICast";

// Utilities
import { formatDate } from "../utilities/formatDate";
import { formatRuntime } from "../utilities/formatRuntime";

// Data
import { moviePages } from "../data/moviePages";

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
        <div className="vote">
          <VoteCountPercentage vote={movie?.vote_average} large />
          <HDiv variant="heading--h4" heading="user score" />
        </div>
        <Overview caption={movie?.tagline} text={movie?.overview} />
        <CrewJobs credits={movie?.credits} />
      </Header>

      <Statistics movie={movie} />
      {/* Top billed cast */}
      <Article name="article__top-billed-cast">
        <Container>
          <H2 heading="Top billed cast" />
          <Cards
            getID={(item: ICast) => item.id}
            renderLink={(item: ICast) => `/person/${item.id}`}
            renderItem={(item: ICast) => (
              <>
                <ImageComponent
                  src={`https://image.tmdb.org/t/p/w500/${item.profile_path}`}
                  fallback="/images/error_500x750.webp"
                  alt={item.name}
                />
                <CardContent heading={item.name} body={item.character} />
              </>
            )}
            data={movie?.credits.cast}
            sort={(a, b) => b.popularity - a.popularity}
            limit
          />
        </Container>
      </Article>
      <ArticleVideos data={movie?.videos.results} />
      <ArticleReviews data={movie?.reviews.results} />
      <Collection
        name={movie?.belongs_to_collection?.name}
        image={movie?.belongs_to_collection?.backdrop_path}
        id={movie?.belongs_to_collection?.id}
      />

      {/* Recommended Movies */}
      <ArticleMoviesScrollX
        data={movie?.recommendations.results}
        name="recommended-movies"
        heading="recommendations"
      />
      {/* Similar Movies */}
      <ArticleMoviesScrollX
        data={movie?.similar.results}
        name="similar-movies"
        heading="You may also enjoy..."
      />
    </>
  );
}
