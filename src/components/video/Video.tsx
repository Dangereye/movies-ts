import { IVideo } from "../../interfaces/IVideo";
import { formatDate } from "../../utilities/formatDate";
import ImageComponent from "../image/Image";
import BodyText from "../typography/BodyText";
import HDiv from "../typography/HDiv";
import { GoPlay } from "react-icons/go";

type VideoProps = {
  data: IVideo;
};

export default function Video({ data }: VideoProps) {
  return (
    <div className="video">
      <div className="video-image">
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
