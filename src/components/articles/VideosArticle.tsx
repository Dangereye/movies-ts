import { useState, useEffect } from "react";
import { IVideo } from "../../interfaces/IVideo";
import Button from "../buttons/Button";
import Container from "../container/Container";
import BodyText from "../typography/BodyText";
import H2 from "../typography/H2";
import Video from "../videos/video/Video";
import Wrapper from "../wrapper/Wrapper";
import Article from "./Article";

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

type VideoArticleProps = {
  data: IVideo[] | undefined;
};

export default function VideosArticle({ data }: VideoArticleProps) {
  const [videos, setVideos] = useState(initialVideos);
  const [active, setActive] = useState<ActiveProps>("trailer");

  useEffect(() => {
    let obj = initialVideos;

    const organiseVideos = () => {
      const trailer: IVideo[] = [];
      const teaser: IVideo[] = [];
      const clip: IVideo[] = [];
      const behind_the_scenes: IVideo[] = [];
      const blooper: IVideo[] = [];
      const featurette: IVideo[] = [];

      data?.forEach((video) => {
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
        obj = {
          trailer,
          teaser,
          clip,
          behind_the_scenes,
          blooper,
          featurette,
        };
        return obj;
      });
    };
    organiseVideos();
    setVideos(obj);
  }, [data]);

  const makePlural = (word: string) => {
    if (word.match(/\w{4,}s/)) {
      return word;
    }
    return `${word}s`;
  };

  const updateVideos = (value: ActiveProps) => {
    setActive(value);
  };

  return (
    <Article>
      <Container>
        <H2 heading={`Movie ${makePlural(active)}`} />
        <Wrapper name="video-options" variant="flex">
          {videos.trailer.length > 0 && (
            <Button
              name={`Trailers ${videos.trailer.length}`}
              variant="btn--tertiary"
              onClick={(e) => updateVideos("trailer")}
            />
          )}
          {videos.teaser.length > 0 && (
            <Button
              name={`Teasers ${videos.teaser.length}`}
              variant="btn--tertiary"
              onClick={(e) => updateVideos("teaser")}
            />
          )}
          {videos.clip.length > 0 && (
            <Button
              name={`Clips ${videos.clip.length}`}
              variant="btn--tertiary"
              onClick={(e) => updateVideos("clip")}
            />
          )}
          {videos.behind_the_scenes.length > 0 && (
            <Button
              name={`Behind the Scenes ${videos.behind_the_scenes.length}`}
              variant="btn--tertiary"
              onClick={(e) => updateVideos("behind_the_scenes")}
            />
          )}
          {videos.blooper.length > 0 && (
            <Button
              name={`Bloopers ${videos.blooper.length}`}
              variant="btn--tertiary"
              onClick={(e) => updateVideos("blooper")}
            />
          )}
          {videos.featurette.length > 0 && (
            <Button
              name={`Featurettes ${videos.featurette.length}`}
              variant="btn--tertiary"
              onClick={(e) => updateVideos("featurette")}
            />
          )}
        </Wrapper>
        <div className="videos">
          {videos[active].length > 0 ? (
            videos[active]
              .sort(function (a, b) {
                return Date.parse(a.published_at) - Date.parse(b.published_at);
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
  );
}
