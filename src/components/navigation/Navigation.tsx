import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type NavigationProps<T> = {
  variant: 'horizontal' | 'vertical' | 'comma-separated';
  getId: (item: T) => string | number;
  getLink: (item: T) => string;
  renderItem: (item: T) => ReactNode;
  data: T[] | undefined;
};

export default function Navigation<T>({
  variant,
  getId,
  getLink,
  renderItem,
  data,
}: NavigationProps<T>) {
  return (
    <nav className='navigation'>
      <ul className={`navigation__list ${variant}`}>
        {data?.map((item) => (
          <li key={getId(item)} className='navigation__item'>
            <Link to={getLink(item)} className='navigation__link'>
              {renderItem(item)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
