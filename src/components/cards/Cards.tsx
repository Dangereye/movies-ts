// React router
import { Link, useLocation } from 'react-router-dom';

// Components
import ImageComponent from '../image/Image';
import CardContent from './card/CardContent';
import BodyText from '../typography/BodyText';
import Article from '../articles/Article';
import Container from '../container/Container';
import H2 from '../typography/H2';

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
  getVotes: (item: T) => number | undefined;
  getBodyText: (item: T) => string;
  sortItems: (a: T, b: T) => number;
};

export default function Cards<T>({
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
  sortItems,
}: CardsProps<T>) {
  const { pathname } = useLocation();
  const content = (
    <div className={`cards cards__${variant}`}>
      {data
        ?.sort(sortItems)
        .filter((item, i) => (limit ? i < 10 : true))
        .map((item) => (
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
            <CardContent heading={getHeading(item)} vote={getVotes(item)}>
              <BodyText text={getBodyText(item)} />
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
            text={`Showing ${limit ? '10' : data?.length} ${media_type}`}
          />
          {content}
          {media_type === 'people' &&
            (pathname.includes('movies') || pathname.includes('tv')) &&
            !pathname.includes('cast-crew') && (
              <div className='buttons'>
                <Link
                  to={`${pathname}/cast-crew`}
                  className='btn btn--tertiary'
                >
                  View all cast & crew
                </Link>
              </div>
            )}
        </Container>
      </Article>
    );
  }

  if (data && data.length > 0) {
    return content;
  }

  return null;
}
