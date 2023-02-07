import { MdStarBorder, MdStarHalf, MdStar } from "react-icons/md";

type StarRatingProps = {
  rating: number | null;
};

export default function StarRating({ rating }: StarRatingProps) {
  if (rating) {
    rating = rating / 2;
    if (rating === 5) {
      return (
        <span className="star-rating">
          <MdStar />
          <MdStar />
          <MdStar />
          <MdStar />
          <MdStar />
        </span>
      );
    }
    if (rating < 5 && rating > 4) {
      return (
        <span className="star-rating">
          <MdStar />
          <MdStar />
          <MdStar />
          <MdStar />
          <MdStarHalf />
        </span>
      );
    }
    if (rating === 4) {
      return (
        <span className="star-rating">
          <MdStar />
          <MdStar />
          <MdStar />
          <MdStar />
          <MdStarBorder />
        </span>
      );
    }
    if (rating < 4 && rating > 3) {
      return (
        <span className="star-rating">
          <MdStar />
          <MdStar />
          <MdStar />
          <MdStarHalf />
          <MdStarBorder />
        </span>
      );
    }
    if (rating === 3) {
      return (
        <span className="star-rating">
          <MdStar />
          <MdStar />
          <MdStar />
          <MdStarBorder />
          <MdStarBorder />
        </span>
      );
    }
    if (rating < 3 && rating > 2) {
      return (
        <span className="star-rating">
          <MdStar />
          <MdStar />
          <MdStarHalf />
          <MdStarBorder />
          <MdStarBorder />
        </span>
      );
    }
    if (rating === 2) {
      return (
        <span className="star-rating">
          <MdStar />
          <MdStar />
          <MdStarBorder />
          <MdStarBorder />
          <MdStarBorder />
        </span>
      );
    }
    if (rating < 2 && rating > 1) {
      return (
        <span className="star-rating">
          <MdStar />
          <MdStarHalf />
          <MdStarBorder />
          <MdStarBorder />
          <MdStarBorder />
        </span>
      );
    }
    if (rating === 1) {
      return (
        <span className="star-rating">
          <MdStar />
          <MdStarBorder />
          <MdStarBorder />
          <MdStarBorder />
          <MdStarBorder />
        </span>
      );
    }
    if (rating < 1 && rating > 0) {
      return (
        <span className="star-rating">
          <MdStarHalf />
          <MdStarBorder />
          <MdStarBorder />
          <MdStarBorder />
          <MdStarBorder />
        </span>
      );
    }
  }
  return null;
}
