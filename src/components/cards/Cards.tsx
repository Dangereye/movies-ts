import Card from "./card/Card";

interface IMovie {
  adult: boolean;
  poster_path: string | null;
  overview: string;
  release_date: string;
  genre_ids: number[];
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

type CardsProps = {
  list: IMovie[];
};

export default function Cards({ list }: CardsProps) {
  return (
    <div className="cards">
      {list.map((card, i) => (
        <Card data={card} />
      ))}
    </div>
  );
}
