import { useEffect, useState } from "react";
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
import Article from "../components/article/Article";
import Container from "../components/container/Container";
import Cards from "../components/cards/Cards";
import ImageComponent from "../components/image/Image";
import CardContent from "../components/cards/card/CardContent";
import Video from "../components/videos/video/Video";
import Button from "../components/buttons/Button";

// Hooks
import useMakeQuery from "../hooks/useMakeQuery";

// Interfaces
import { IMovie } from "../interfaces/IMovie";
import { ICast } from "../interfaces/ICast";
import { IVideo } from "../interfaces/IVideo";

// Utilities
import { formatDate } from "../utilities/formatDate";
import { formatRuntime } from "../utilities/formatRuntime";

// Data
import { moviePages } from "../data/moviePages";

type ActiveProps =
  | "trailer"
  | "teaser"
  | "clip"
  | "behind_the_scenes"
  | "blooper"
  | "featurette";

type VideosProps = {
  trailer: IVideo[];
  teaser: IVideo[];
  clip: IVideo[];
  behind_the_scenes: IVideo[];
  blooper: IVideo[];
  featurette: IVideo[];
};

const initialVideos = {
  trailer: [],
  teaser: [],
  clip: [],
  behind_the_scenes: [],
  blooper: [],
  featurette: [],
} as VideosProps;

export default function MovieDetails() {
  const { movieId } = useParams();
  const [videos, setVideos] = useState(initialVideos);
  const [active, setActive] = useState<ActiveProps>("trailer");

  const {
    data: movie,
    isError,
    isLoading,
  } = useMakeQuery<IMovie>(
    `movie-${movieId}`,
    `movie/${movieId}`,
    `&append_to_response=release_dates,credits,videos`
  );

  const makePlural = (word: string) => {
    if (word.match(/\w{4,}s/)) {
      return word;
    }
    return `${word}s`;
  };

  useEffect(() => {
    let obj = initialVideos;

    const organiseVideos = () => {
      const trailer: IVideo[] = [];
      const teaser: IVideo[] = [];
      const clip: IVideo[] = [];
      const behind_the_scenes: IVideo[] = [];
      const blooper: IVideo[] = [];
      const featurette: IVideo[] = [];

      movie?.videos.results.forEach((video) => {
        if (video.type === "Trailer") {
          trailer.push(video);
        }
        if (video.type === "Teaser") {
          teaser.push(video);
        }
        if (video.type === "Clip") {
          clip.push(video);
        }
        if (video.type === "Behind the Scenes") {
          behind_the_scenes.push(video);
        }
        if (video.type === "Blooper") {
          blooper.push(video);
        }
        if (video.type === "Featurette") {
          featurette.push(video);
        }
        obj = { trailer, teaser, clip, behind_the_scenes, blooper, featurette };
        return obj;
      });
    };
    organiseVideos();
    setVideos(obj);
  }, [movie]);

  if (isLoading) {
    return <H2 heading="Loading" />;
  }

  if (isError) {
    return <H2 heading="Error" />;
  }

  const updateVideos = (value: ActiveProps) => {
    setActive(value);
  };

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
        <Wrapper name="actions" variant="flex">
          <div className="vote">
            <VoteCountPercentage vote={movie?.vote_average} large />
            <HDiv variant="heading--h4" heading="user score" />
          </div>
        </Wrapper>
        <Overview caption={movie?.tagline} text={movie?.overview} />
        <CrewJobs credits={movie?.credits} />
      </Header>

      {/* Top Billed Cast */}
      <Article>
        <Container>
          <H2 heading="Top billed cast" />
          <Cards
            getID={(item: ICast) => item.id}
            renderLink={(item) => `/person/${item.id}`}
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
      <Article>
        <Container>
          <H2 heading={`Movie ${makePlural(active)}`} />
          <Wrapper name="video-options" variant="flex">
            <Button
              name={`Trailers ${videos.trailer.length}`}
              variant="btn--tertiary"
              onClick={(e) => updateVideos("trailer")}
            />
            <Button
              name={`Teasers ${videos.teaser.length}`}
              variant="btn--tertiary"
              onClick={(e) => updateVideos("teaser")}
            />
            <Button
              name={`Clips ${videos.clip.length}`}
              variant="btn--tertiary"
              onClick={(e) => updateVideos("clip")}
            />
            <Button
              name={`Behind the Scenes ${videos.behind_the_scenes.length}`}
              variant="btn--tertiary"
              onClick={(e) => updateVideos("behind_the_scenes")}
            />
            <Button
              name={`Bloopers ${videos.blooper.length}`}
              variant="btn--tertiary"
              onClick={(e) => updateVideos("blooper")}
            />
            <Button
              name={`Featurettes ${videos.featurette.length}`}
              variant="btn--tertiary"
              onClick={(e) => updateVideos("featurette")}
            />
          </Wrapper>
          <div className="videos">
            {videos[active].length > 0 ? (
              videos[active]
                .sort(function (a, b) {
                  return (
                    Date.parse(a.published_at) - Date.parse(b.published_at)
                  );
                })
                .map((video) => <Video key={video.id} data={video} />)
            ) : (
              <BodyText
                text={`We don't seem to have any ${active} videos at this time.`}
              />
            )}
          </div>
        </Container>
      </Article>
    </>
  );
}
