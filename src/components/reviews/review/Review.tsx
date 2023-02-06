import { GiRoundStar } from "react-icons/gi";
import { IReview } from "../../../interfaces/IReview";
import { formatDate } from "../../../utilities/formatDate";
import ImageComponent from "../../image/Image";
import BodyText from "../../typography/BodyText";
import H3 from "../../typography/H3";
import SmallText from "../../typography/SmallText";
import Wrapper from "../../wrapper/Wrapper";
import parse from "html-react-parser";

type ReviewProps = {
  data: IReview;
};

export default function Review({ data }: ReviewProps) {
  const formatContent = (content: string) => {
    const formatted = content
      .replace(/\*\*[.\s]/g, "</strong>")
      .replace(/\*\*/g, "<Strong>")
      .replace(/[_|]/g, " ");
    return <p className="body-text">{parse(formatted)}</p>;
  };

  return (
    <div className="review">
      <div className="avatar">
        <Wrapper name="avatar-wrapper">
          <ImageComponent
            width={50}
            height={50}
            src={`https://image.tmdb.org/t/p/w500/${data.author_details.avatar_path}`}
            fallback="/images/error_100x100.webp"
            alt={data.author}
          />
        </Wrapper>
      </div>
      <div className="content">
        <H3 heading={`A Review By ${data.author}`} />

        <SmallText
          text={
            data.updated_at
              ? `Updated - ${formatDate(data.updated_at)}`
              : `Created -${formatDate(data.created_at)}`
          }
        />
        {formatContent(data.content)}
      </div>
      <div className="rating">
        <span>
          <GiRoundStar />
        </span>
        <span>{data.author_details.rating}</span>
      </div>
    </div>
  );
}
