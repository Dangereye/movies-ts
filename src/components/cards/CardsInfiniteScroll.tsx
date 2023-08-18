// React
import { Fragment, useEffect, useMemo, useRef } from 'react';

// React router
import { Link } from 'react-router-dom';

// React query
import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
} from '@tanstack/react-query';

// Interfaces
import { IPage } from '../../interfaces/IPage';
import { IMovieMin } from '../../interfaces/IMovieMin';
import { IPerson } from '../../interfaces/IPerson';
import { ITVShowMin } from '../../interfaces/ITVShowMin';

// Components
import ImageComponent from '../image/Image';
import CardContent from './card/CardContent';
import BodyText from '../typography/BodyText';

type CardsInfiniteScrollProps<T> = {
  getId: (item: T) => number;
  getLink: (item: T) => string;
  getHeading: (item: T) => string;
  getImage: (item: T) => string | null;
  poster_sizes?: 'w92' | 'w154' | 'w185' | 'w300' | 'w500' | 'original' | '';
  profile_sizes?: 'w45' | 'w185' | 'h632' | 'original' | '';
  getVotes: (item: T) => number | undefined;
  getBodyText: (item: T) => string | null | undefined;
  data: IPage<T>[];
  hasNextPage: boolean | undefined;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<
    InfiniteQueryObserverResult<
      IPage<IMovieMin | ITVShowMin | IPerson>,
      unknown
    >
  >;
};

export default function CardsInfiniteScroll<T>({
  data,
  getId,
  getLink,
  getHeading,
  getImage,
  poster_sizes = '',
  profile_sizes = '',
  getVotes,
  getBodyText,
  hasNextPage,
  fetchNextPage,
}: CardsInfiniteScrollProps<T>) {
  const lastCard = useRef<HTMLAnchorElement | null>(null);

  const callBack = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (entry.isIntersecting && hasNextPage) {
      fetchNextPage();
      observer.disconnect();
    }
  };

  const options = { rootMargin: '400px', threshold: 0.1 };

  const observer = useMemo(
    () => new IntersectionObserver(callBack, options),
    // eslint-disable-next-line
    [lastCard.current]
  );

  useEffect(() => {
    const card = lastCard.current;
    if (card) observer.observe(card);

    return () => {
      if (card) observer.unobserve(card);
    };
  }, [data, observer]);

  return (
    <div className='cards cards__list'>
      {data.map((page, i) => (
        <Fragment key={`page-${i}`}>
          {page.results.map((item, i) => {
            if (i + 1 === page.results.length) {
              return (
                <Link
                  key={getId(item)}
                  ref={lastCard}
                  to={getLink(item)}
                  className='card'
                >
                  <ImageComponent
                    key={getHeading(item)}
                    base_url='https://image.tmdb.org/t/p/'
                    profile_sizes={profile_sizes}
                    poster_sizes={poster_sizes}
                    filename={getImage(item)}
                    fallback='/images/error_300x450.webp'
                    width={300}
                    aspect_ratio='aspect-ratio-2-3'
                    alt={getHeading(item)}
                  />
                  <CardContent heading={getHeading(item)} vote={getVotes(item)}>
                    <BodyText text={getBodyText(item)} />
                  </CardContent>
                </Link>
              );
            } else {
              return (
                <Link key={getId(item)} to={getLink(item)} className='card'>
                  <ImageComponent
                    key={getHeading(item)}
                    base_url='https://image.tmdb.org/t/p/'
                    profile_sizes={profile_sizes}
                    poster_sizes={poster_sizes}
                    filename={getImage(item)}
                    fallback='/images/error_300x450.webp'
                    width={300}
                    aspect_ratio='aspect-ratio-2-3'
                    alt={getHeading(item)}
                  />
                  <CardContent heading={getHeading(item)} vote={getVotes(item)}>
                    <BodyText text={getBodyText(item)} />
                  </CardContent>
                </Link>
              );
            }
          })}
        </Fragment>
      ))}
    </div>
  );
}
