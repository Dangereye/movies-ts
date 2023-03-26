// Interfaces
import { IMovieMin } from "../../interfaces/IMovieMin";

// Utilities
import { formatDate } from "../../utilities/formatDate";
import { removeDuplicatesById } from "../../utilities/removeDuplicatesById";

// Components
import Article from "./Article";
import Container from "../container/Container";
import H2 from "../typography/H2";
import Cards from "../cards/Cards";
import BodyText from "../typography/BodyText";
import ImageComponent from "../image/Image";
import CardContent from "../cards/card/CardContent";

type ArticleMoviesMinProps = {
  variant: "scroll-x" | "list";
  name: string;
  heading: string;
  data: IMovieMin[] | undefined;
};

export default function ArticleMoviesMin({
  variant,
  name,
  heading,
  data,
}: ArticleMoviesMinProps) {
  if (data && data.length > 0) {
    const filtered = removeDuplicatesById(data);
    return (
      <Article name={name}>
        <Container>
          <H2 heading={heading} />
          <BodyText text={`Showing ${filtered.length} movies`} />
          <Cards
            variant={variant}
            data={filtered}
            getId={(item) => item.id}
            getLink={(item) => `/movies/${item.id}`}
            renderContent={(item) => (
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
