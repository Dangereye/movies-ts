import { Fragment, ReactNode, useRef, useEffect } from 'react';

// Components
import { Link } from 'react-router-dom';

// Interfaces
import { IPage } from '../../interfaces/IPage';
import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
} from '@tanstack/react-query';

type InfiniteCardsProps<T> = {
  getId: (item: T) => number;
  getLink: (item: T) => string;
  renderContent: (item: T) => ReactNode;
  data: IPage<T>[];
  hasNextPage: boolean | undefined;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<IPage<T>, unknown>>;
};

export default function InfiniteCards<T>({
  getId,
  getLink,
  renderContent,
  data,
  hasNextPage,
  fetchNextPage,
}: InfiniteCardsProps<T>) {
  const lastCard = useRef(null);

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
          {page?.results?.map((item, i) => {
            if (i + 1 === page.results.length) {
              return (
                <Link
                  key={getId(item)}
                  ref={lastCard}
                  to={getLink(item)}
                  className='card'
                >
                  {renderContent(item)}
                </Link>
              );
            }
            return (
              <Link key={getId(item)} to={getLink(item)} className='card'>
                {renderContent(item)}
              </Link>
            );
          })}
        </Fragment>
      ))}
    </div>
  );
}
