// Components
import ImageComponent from '../image/Image';
import SmallText from '../typography/SmallText';
import Wrapper from '../wrapper/Wrapper';
import StarRating from '../star_rating/StarRating';
import ExpandableText from '../typography/ExpandableText';
import HDiv from '../typography/HDiv';

// Interfaces
import { IReview } from '../../interfaces/IReview';

// Utilities
import { formatDate } from '../../utilities/formatDate';

type ReviewProps = {
  data: IReview;
};

export default function Review({ data }: ReviewProps) {
  return (
    <div className='review'>
      <Wrapper name='review-heading' variant='flex'>
        <ImageComponent
          base_url={
            data.author_details.avatar_path?.includes('https')
              ? ''
              : 'https://image.tmdb.org/t/p/'
          }
          filename={data.author_details.avatar_path}
          profile_sizes={
            data.author_details.avatar_path?.includes('https') ? '' : 'w185'
          }
          fallback='/images/error_100x100.webp'
          width={75}
          aspect_ratio='aspect-ratio-1-1'
          alt={data.author}
          loading='lazy'
        />
        <div>
          <HDiv variant='heading--h3' heading={`${data.author}`} />
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
