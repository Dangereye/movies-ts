// React router
import { Link } from 'react-router-dom';

type NavigationProps<T> = {
  variant: 'horizontal' | 'vertical' | 'comma-separated';
  getId: (item: T) => string | number;
  getLink: (item: T) => string;
  renderItem: (item: T) => React.ReactNode;
  data: T[] | undefined;
  onClick?: () => void;
};

export default function Navigation<T>({
  variant,
  getId,
  getLink,
  renderItem,
  data,
  onClick,
}: NavigationProps<T>) {
  return (
    <nav className='navigation'>
      <ul className={`navigation__list ${variant}`}>
        {data?.map((item) => (
          <li key={getId(item)} className='navigation__item' onClick={onClick}>
            <Link to={getLink(item)} className='navigation__link'>
              {renderItem(item)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
