// Components
import ImageComponent from "../../image/Image";
import HDiv from "../../typography/HDiv";
import BodyText from "../../typography/BodyText";

// Utilities
import { formatDate } from "../../../utilities/formatDate";

interface CardProps<T> {
  data: T;
}

export default function Card<
  T extends { title: string; poster_path: string | null; release_date: string }
>({ data }: CardProps<T>) {
  return (
    <div className="card">
      <ImageComponent
        src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
        fallback="/images/error_500x750.webp"
        alt={data.title}
      />
      <div className="content">
        <HDiv heading={data.title} variant="heading--h4" />
        <BodyText text={formatDate(data.release_date)} />
      </div>
    </div>
  );
}
