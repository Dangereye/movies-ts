// Interfaces
import { IMovieMin } from "../../interfaces/IMovieMin";

// Utilities
import { formatDate } from "../../utilities/formatDate";

// Components
import CardContent from "../cards/card/CardContent";
import Cards from "../cards/Cards";
import Container from "../container/Container";
import ImageComponent from "../image/Image";
import H2 from "../typography/H2";
import Article from "./Article";

type ArticleMoviesScrollXProps = {
  data: IMovieMin[] | undefined;
  name: string;
  heading: string;
  sort?: (a: IMovieMin, b: IMovieMin) => number;
};

export default function ArticleMoviesScrollX({
  data,
  name,
  heading,
  sort,
}: ArticleMoviesScrollXProps) {
  if (data && sort) {
    data = data.sort(sort);
  }

  if (data && data.length > 0) {
    return (
      <Article name={`article__${name}`}>
        <Container>
          <H2 heading={heading} />
          <Cards
            getID={(item: IMovieMin) => item.id}
            renderLink={(item) => `/movies/${item.id}`}
            renderItem={(item: IMovieMin) => (
              <>
                <ImageComponent
                  src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                  fallback="/images/error_500x750.webp"
                  alt={item.title}
                />
                <CardContent
                  vote={item.vote_average}
                  heading={item.title}
                  body={formatDate(item.release_date)}
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
