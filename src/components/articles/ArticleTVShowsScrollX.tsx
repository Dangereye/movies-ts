// Interfaces
import { ITVShowMin } from "../../interfaces/ITVShowMin";

// Utilities
import { formatDate } from "../../utilities/formatDate";

// Components
import CardContent from "../cards/card/CardContent";
import Cards from "../cards/Cards";
import Container from "../container/Container";
import ImageComponent from "../image/Image";
import H2 from "../typography/H2";
import Article from "./Article";

type ArticleITVShowScrollXProps = {
  data: ITVShowMin[] | undefined;
  name: string;
  heading: string;
  sort?: (a: ITVShowMin, b: ITVShowMin) => number;
};

export default function ArticleTVShowsScrollX({
  data,
  name,
  heading,
  sort,
}: ArticleITVShowScrollXProps) {
  if (data && sort) {
    data = data.sort(sort);
  }

  if (data && data.length > 0) {
    return (
      <Article name={`article__${name}`}>
        <Container>
          <H2 heading={heading} />
          <Cards
            getID={(item: ITVShowMin) => item.id}
            renderLink={(item) => `/tv/${item.id}`}
            renderItem={(item: ITVShowMin) => (
              <>
                <ImageComponent
                  src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                  fallback="/images/error_500x750.webp"
                  alt={item.name}
                />
                <CardContent
                  vote={item.vote_average}
                  heading={item.name}
                  body={formatDate(item.first_air_date)}
                />
              </>
            )}
            data={data}
          />
        </Container>
      </Article>
    );
  }
  return null;
}
