// React
import { Fragment, useEffect, useRef } from 'react';

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
  getVotes: (item: T) => number;
  getBodyText: (item: T) => string;
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

  const observer = new IntersectionObserver(callBack, options);

  useEffect(() => {
    if (lastCard.current) observer.observe(lastCard.current);

    return () => {
      if (lastCard.current) observer.unobserve(lastCard.current);
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
              );
            } else {
              return (
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
              );
            }
          })}
        </Fragment>
      ))}
    </div>
  );
}
