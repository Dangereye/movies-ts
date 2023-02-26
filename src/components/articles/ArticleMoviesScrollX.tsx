import { formatDate } from "../../utilities/formatDate";
import { removeDuplicatesById } from "../../utilities/removeDuplicatesById";
import CardContent from "../cards/card/CardContent";
import Cards from "../cards/Cards";
import Container from "../container/Container";
import ImageComponent from "../image/Image";
import BodyText from "../typography/BodyText";
import H2 from "../typography/H2";
import Article from "./Article";

type ArticleMoviesScrollXProps<T> = {
  name: string;
  heading: string;
  data: T[] | undefined;
};

export default function ArticleMoviesScrollX<
  T extends {
    id: number;
    poster_path: string | null;
    vote_average: number;
    title: string;
    release_date: string;
  }
>({ name, heading, data }: ArticleMoviesScrollXProps<T>) {
  if (data && data.length > 0) {
    const filtered = removeDuplicatesById(data);
    return (
      <Article name={name}>
        <Container>
          <H2 heading={heading} />
          <BodyText text={`Showing ${filtered.length} movies`} />
          <Cards
            getID={(item: T) => item.id}
            renderLink={(item) => `/movies/${item.id}`}
            renderItem={(item: T) => (
              <>
                <ImageComponent
                  src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                  fallback="/images/error_500x750.webp"
                  alt={item.title}
                />
                <CardContent vote={item.vote_average} heading={item.title}>
                  <BodyText
                    text={
                      item.release_date ? formatDate(item.release_date) : "TBC"
                    }
                  />
                </CardContent>
              </>
            )}
            data={filtered}
            sort={(a, b) =>
              (b.release_date ? +new Date(b.release_date) : 0) -
              (a.release_date ? +new Date(a.release_date) : 0)
            }
          />
        </Container>
      </Article>
    );
  }
  return null;
}
