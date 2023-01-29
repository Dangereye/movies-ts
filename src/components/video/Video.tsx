import { useContext } from "react";
import { IVideo } from "../../interfaces/IVideo";
import { formatDate } from "../../utilities/formatDate";
import ImageComponent from "../image/Image";
import BodyText from "../typography/BodyText";
import HDiv from "../typography/HDiv";
import { GoPlay } from "react-icons/go";
import { VideoContext } from "../../contexts/VideoContext";

type VideoProps = {
  data: IVideo;
};

export default function Video({ data }: VideoProps) {
  const { videoPlayer, setVideoPlayer } = useContext(VideoContext);

  const openPlayer = () => {
    setVideoPlayer({ isOpen: true, key: data.key });
  };
  return (
    <div className="video">
      <div className="video-image" onClick={openPlayer}>
        <ImageComponent
          width={500}
          src={`https://i.ytimg.com/vi/${data.key}/hqdefault.jpg`}
          fallback="/images/error_600x450.webp"
          alt={data.name}
        />
        <div className="play-icon__bg"></div>
        <GoPlay className="play-icon" />
      </div>
      <div className="content">
        <HDiv variant="heading--h4" heading={data.name} />
        <BodyText text={formatDate(data.published_at)} />
      </div>
    </div>
  );
}
