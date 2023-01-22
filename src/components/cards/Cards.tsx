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
  if (limit) {
    return (
      <div className="cards">
        {data
          ?.sort(sort)
          .slice(0, 10)
          .map((item) => (
            <Link key={getID(item)} to={renderLink(item)} className="card">
              {renderItem(item)}
            </Link>
          ))}
      </div>
    );
  }
  return (
    <div className="cards">
      {data?.sort(sort).map((item) => (
        <Link key={getID(item)} to={renderLink(item)} className="card">
          {renderItem(item)}
        </Link>
      ))}
    </div>
  );
}
