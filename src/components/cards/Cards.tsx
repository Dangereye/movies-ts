import { ReactNode } from "react";
import { Link } from "react-router-dom";

type CardsProps<T> = {
  getID: (item: T) => number;
  renderItem: (item: T) => ReactNode;
  renderLink: (item: T) => string;
  data: T[];
};

export default function Cards<T extends {}>({
  getID,
  renderItem,
  renderLink,
  data,
}: CardsProps<T>) {
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
