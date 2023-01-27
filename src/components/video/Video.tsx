import { IVideo } from "../../interfaces/IVideo";
import ImageComponent from "../image/Image";
import HDiv from "../typography/HDiv";

type VideoProps = {
  video: IVideo;
};

export default function Video({ video }: VideoProps) {
  return (
    <div className="video">
      <ImageComponent
        width={500}
        src={`https://i.ytimg.com/vi/${video.key}/hqdefault.jpg`}
        fallback={`https://i.ytimg.com/vi/${video.key}/hqdefault.jpg`}
        alt={video.name}
      />
      <HDiv variant="heading--h4" heading={video.name} />
    </div>
  );
}
