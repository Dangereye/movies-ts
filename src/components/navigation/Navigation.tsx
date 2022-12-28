import { ReactNode } from "react";
import { Link } from "react-router-dom";

type NavigationProps<T> = {
  variant?: "horizontal" | "comma-separated";
  getID: (item: T) => string;
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
        {data?.map((page) => (
          <li key={getID(page)} className="navigation__item">
            <Link to={getLink(page)} className="navigation__link">
              {renderItem(page)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
