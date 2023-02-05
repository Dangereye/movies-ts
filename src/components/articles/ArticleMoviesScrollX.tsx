import { IMovieMin } from "../../interfaces/IMovieMin";
import { formatDate } from "../../utilities/formatDate";
import CardContent from "../cards/card/CardContent";
import Cards from "../cards/Cards";
import Container from "../container/Container";
import ImageComponent from "../image/Image";
import H2 from "../typography/H2";
import Article from "./Article";

type ArticleMoviesScrollProps = {
  data: IMovieMin[] | undefined;
  name: string;
  title: string;
};

export default function ArticleMoviesScrollX({
  data,
  name,
  title,
}: ArticleMoviesScrollProps) {
  if (data && data.length > 0) {
    return (
      <Article name={`article__${name}`}>
        <Container>
          <H2 heading={title} />
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
            sort={(a, b) => b.popularity - a.popularity}
          />
        </Container>
      </Article>
    );
  }
  return null;
}
