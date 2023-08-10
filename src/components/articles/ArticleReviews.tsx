// React
import { useState } from 'react';

// Components
import Article from './Article';
import Container from '../container/Container';
import H2 from '../typography/H2';
import Review from '../review/Review';
import Button from '../buttons/Button';

// Interfaces
import { IReview } from '../../interfaces/IReview';

type ArticlesReviewsProps = {
  data: IReview[] | undefined;
};

export default function ArticleReviews({ data }: ArticlesReviewsProps) {
  const [expanded, setExpanded] = useState(false);
  const reviewQty = data?.length;

  if (data && data.length > 2 && !expanded) {
    data = data.slice(0, 2);
  }

  const toggleReviews = () => {
    setExpanded(!expanded);
  };

  if (data && data.length > 0) {
    return (
      <Article name='reviews'>
        <Container>
          <H2 heading='Reviews' />
          <div className='reviews'>
            {data.map((item) => (
              <Review key={item.id} data={item} />
            ))}
          </div>
          {reviewQty && reviewQty > 2 && (
            <div className='buttons'>
              <Button
                name={expanded ? 'View less reviews' : 'View all reviews'}
                variant='btn--tertiary'
                onClick={toggleReviews}
              />
            </div>
          )}
        </Container>
      </Article>
    );
  }
  return null;
}
