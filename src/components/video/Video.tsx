import ImageComponent from "../image/Image";
import HDiv from "../typography/HDiv";

type VideoProps = {
  video: {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published: string;
    id: string;
  };
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

    // <iframe
    //   className="video"
    //   width="560"
    //   height="315"
    //   src={`https://www.youtube.com/embed/${videoKey}`}
    //   title="YouTube video player"
    //   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    //   allowFullScreen
    // ></iframe>
  );
}
