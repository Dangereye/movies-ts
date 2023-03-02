import { ReactNode } from "react";
import { Link } from "react-router-dom";

type CardsScrollXProps<T> = {
  getID: (item: T) => number;
  renderItem: (item: T) => ReactNode;
  renderLink: (item: T) => string;
  sort?: (a: T, b: T) => number;
  limit?: boolean;
  data: T[] | undefined;
};

export default function CardsScrollX<T>({
  getID,
  renderItem,
  renderLink,
  sort,
  limit = false,
  data,
}: CardsScrollXProps<T>) {
  if (data && sort) {
    data = data.sort(sort);
  }

  if (data && data.length > 9 && limit) {
    data = data.slice(0, 10);
  }

  if (data && data.length > 0) {
    return (
      <div className="cards-scroll-x">
        {data.map((item) => (
          <Link key={getID(item)} to={renderLink(item)} className="card">
            {renderItem(item)}
          </Link>
        ))}
      </div>
    );
  }

  return null;
}
