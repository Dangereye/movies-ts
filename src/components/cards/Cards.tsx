import { ReactNode } from "react";

import { Link } from "react-router-dom";

type CardsProps<T> = {
  variant: "scroll-x" | "list";
  getId: (item: T) => number;
  getLink: (item: T) => string;
  renderContent: (item: T) => ReactNode;
  data: T[];
  sort: (a: T, b: T) => number;
  limit: boolean;
};

export default function Cards<T>({
  variant,
  getId,
  getLink,
  renderContent,
  data,
  sort,
  limit,
}: CardsProps<T>) {
  if (data && sort) {
    data = data.sort(sort);
  }

  if (data && data.length > 9 && limit) {
    data = data.slice(0, 10);
  }
  if (data && data.length > 0) {
    return (
      <div className={`cards ${variant}`}>
        {data.map((item) => (
          <Link key={getId(item)} to={getLink(item)} className="card">
            {renderContent(item)}
          </Link>
        ))}
      </div>
    );
  }
  return null;
}
