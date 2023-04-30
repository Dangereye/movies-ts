import { Fragment, ReactNode } from 'react';

// Components
import { Link } from 'react-router-dom';

// Interfaces
import { IPage } from '../../interfaces/IPage';
import Button from '../buttons/Button';

type InfiniteCardsProps<T> = {
  getId: (item: T) => number;
  getLink: (item: T) => string;
  renderContent: (item: T) => ReactNode;
  data: IPage<T>[];
};

export default function InfiniteCards<T>({
  getId,
  getLink,
  renderContent,
  data,
}: InfiniteCardsProps<T>) {
  return (
    <div className='cards cards__list'>
      {data.map((page, i) => (
        <Fragment key={`page-${i}`}>
          {page?.results?.map((item) => (
            <Link key={getId(item)} to={getLink(item)} className='card'>
              {renderContent(item)}
            </Link>
          ))}
        </Fragment>
      ))}
    </div>
  );
}
