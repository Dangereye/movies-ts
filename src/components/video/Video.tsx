import { IVideo } from "../../interfaces/IVideo";
import { formatDate } from "../../utilities/formatDate";
import ImageComponent from "../image/Image";
import BodyText from "../typography/BodyText";
import HDiv from "../typography/HDiv";

type VideoProps = {
  data: IVideo;
};

export default function Video({ data }: VideoProps) {
  return (
    <div className="video">
      <ImageComponent
        width={500}
        src={`https://i.ytimg.com/vi/${data.key}/hqdefault.jpg`}
        fallback="/images/error_600x450.webp"
        alt={data.name}
      />
      <HDiv variant="heading--h4" heading={data.name} />
      <BodyText text={formatDate(data.published_at)} />
    </div>
  );
}
