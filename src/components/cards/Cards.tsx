// React
import { useCallback, useMemo } from 'react';

// React router
import { Link } from 'react-router-dom';

// Components
import ImageComponent from '../image/Image';
import CardContent from './card/CardContent';
import BodyText from '../typography/BodyText';
import Article from '../articles/Article';
import Container from '../container/Container';
import H2 from '../typography/H2';
import SmallText from '../typography/SmallText';
import { removeDuplicatesById } from '../../utilities/removeDuplicatesById';

type CardsProps<T> = {
  article?: boolean;
  heading?: string;
  media_type: 'movies' | 'TV shows' | 'people';
  limit?: boolean;
  variant: 'scroll-x' | 'list';
  data: T[] | undefined;
  getId: (item: T) => number | string;
  getLink: (item: T) => string;
  getHeading: (item: T) => string;
  getImage: (item: T) => string | null;
  getVotes?: (item: T) => number | null | undefined;
  getBodyText?: (item: T) => string | null;
  getJobs?: (
    item: T
  ) => { credit_id: string; job: string; episode_count: number }[];
  getRoles?: (
    item: T
  ) => { credit_id: string; character: string; episode_count: number }[];
  getSmallText?: (item: T) => string | null;
  sortItems: (a: T, b: T) => number;
  children?: React.ReactNode;
};

export default function Cards<T extends { id: number }>({
  article = false,
  heading = 'article heading',
  media_type,
  limit = false,
  variant,
  data,
  getId,
  getLink,
  getHeading,
  getImage,
  getVotes,
  getBodyText,
  getJobs,
  getRoles,
  getSmallText,
  sortItems,
  children,
}: CardsProps<T>) {
  const filtered = removeDuplicatesById(data)
    ?.sort(sortItems)
    .filter((item, i) => (limit ? i < 10 : true));

  const content = (
    <div className={`cards cards__${variant}`}>
      {filtered?.map((item) => (
        <Link key={getId(item)} to={getLink(item)} className='card'>
          <ImageComponent
            key={getHeading(item)}
            src={
              getImage(item)
                ? `https://image.tmdb.org/t/p/w500/${getImage(item)}`
                : '/images/error_500x750.webp'
            }
            fallback='/images/error_500x750.webp'
            alt={getHeading(item)}
          />
          <CardContent
            heading={getHeading(item)}
            vote={getVotes && getVotes(item)}
          >
            <BodyText text={getBodyText && getBodyText(item)} />
            {getJobs && (
              <div className='jobs'>
                {getJobs(item).map((job) => (
                  <BodyText key={job.credit_id} text={job.job} />
                ))}
              </div>
            )}
            {getRoles && (
              <div className='roles'>
                {getRoles(item).map((role) => (
                  <BodyText key={role.credit_id} text={role.character} />
                ))}
              </div>
            )}

            <SmallText text={getSmallText && getSmallText(item)} />
          </CardContent>
        </Link>
      ))}
    </div>
  );

  if (data && data.length > 0 && article) {
    return (
      <Article name={heading}>
        <Container>
          <H2 heading={heading} />
          <BodyText
            text={`Showing ${limit ? '10' : data?.length} ${
              data.length > 1
                ? media_type
                : data.length === 1 && media_type === 'movies'
                ? 'movie'
                : data.length === 1 && media_type === 'TV shows'
                ? 'TV show'
                : 'person'
            }`}
          />
          {content}
          {children}
        </Container>
      </Article>
    );
  }

  if (data && data.length > 0) {
    return content;
  }

  return null;
}
