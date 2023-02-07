import parse from "html-react-parser";

// Components
import ImageComponent from "../../image/Image";
import H3 from "../../typography/H3";
import SmallText from "../../typography/SmallText";
import Wrapper from "../../wrapper/Wrapper";
import StarRating from "../../star_rating/StarRating";

// Interfaces
import { IReview } from "../../../interfaces/IReview";

// Utilities
import { formatDate } from "../../../utilities/formatDate";

type ReviewProps = {
  data: IReview;
};

export default function Review({ data }: ReviewProps) {
  const formatContent = (content: string) => {
    const formatted = content
      .replace(/\*\*[.\s]/g, "</span>")
      .replace(/\*\*/g, `<span className="lead-text">`)
      .replace(/[_|]/g, "");
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
        <Wrapper name="review-title" variant="flex">
          <H3 heading={`${data.author}`} />
          <div className="rating">
            <div className="content">
              <StarRating rating={data.author_details.rating} />
            </div>
          </div>
        </Wrapper>

        <SmallText
          text={
            data.updated_at
              ? `Updated ${formatDate(data.updated_at)}`
              : `Created ${formatDate(data.created_at)}`
          }
        />
        {formatContent(data.content)}
      </div>
    </div>
  );
}
