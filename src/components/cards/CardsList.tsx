import { ReactNode } from "react";
import { Link } from "react-router-dom";

type CardsListProps<T> = {
  data: T[] | undefined;
  getId: (item: T) => number;
  renderLink: (item: T) => string;
  renderItem: (item: T) => ReactNode;
};

export default function CardsList<T>({
  data,
  getId,
  renderLink,
  renderItem,
}: CardsListProps<T>) {
  return (
    <div className="cards-list">
      {data?.map((item) => (
        <Link key={getId(item)} to={renderLink(item)} className="card">
          {renderItem(item)}
        </Link>
      ))}
    </div>
  );
}
