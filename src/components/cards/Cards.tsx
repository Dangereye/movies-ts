import { ReactNode } from "react";
import { Link } from "react-router-dom";

type CardsProps<T> = {
  getID: (item: T) => number;
  renderItem: (item: T) => ReactNode;
  renderLink: (item: T) => string;
  sort?: (a: T, b: T) => number;
  limit?: boolean;
  data: T[] | undefined;
};

export default function Cards<T>({
  getID,
  renderItem,
  renderLink,
  sort,
  limit = false,
  data,
}: CardsProps<T>) {
  if (data && sort) {
    data = data.sort(sort);
  }

  if (data && data.length > 9 && limit) {
    data = data.slice(0, 10);
  }

  if (data && data.length > 0) {
    return (
      <div className="cards">
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
