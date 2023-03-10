import { ReactNode } from "react";
import { Link } from "react-router-dom";

type NavigationProps<T> = {
  variant?: "horizontal" | "comma-separated";
  getID: (item: T) => string | number;
  getLink: (item: T) => string;
  renderItem: (item: T) => ReactNode;
  data: T[] | undefined;
};

export default function Navigation<T>({
  variant,
  getID,
  getLink,
  renderItem,
  data,
}: NavigationProps<T>) {
  return (
    <nav className="navigation">
      <ul className={`navigation__list ${variant}`}>
        {data?.map((item) => (
          <li key={getID(item)} className="navigation__item">
            <Link to={getLink(item)} className="navigation__link">
              {renderItem(item)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
