// Components
import ImageComponent from "../image/Image";
import SmallText from "../typography/SmallText";
import Wrapper from "../wrapper/Wrapper";
import StarRating from "../star_rating/StarRating";
import ExpandableText from "../typography/ExpandableText";

// Interfaces
import { IReview } from "../../interfaces/IReview";

// Utilities
import { formatDate } from "../../utilities/formatDate";
import HDiv from "../typography/HDiv";

type ReviewProps = {
  data: IReview;
};

export default function Review({ data }: ReviewProps) {
  return (
    <div className="review">
      <Wrapper name="review-heading" variant="flex">
        <div className="avatar">
          <ImageComponent
            src={`https://image.tmdb.org/t/p/w500/${data.author_details.avatar_path}`}
            fallback="/images/error_100x100.webp"
            alt={data.author}
            width={60}
            height={60}
          />
        </div>
        <div>
          <HDiv variant="heading--h3" heading={`${data.author}`} />
          <SmallText
            text={
              data.updated_at
                ? formatDate(data.updated_at)
                : formatDate(data.created_at)
            }
          />
        </div>
      </Wrapper>
      <StarRating rating={data.author_details.rating} />
      <ExpandableText text={data.content} lines={3} />
    </div>
  );
}
