// Interfaces
import { IPersonTvCast } from "../../interfaces/IPersonTvCast";

// Utilities
import { formatDate } from "../../utilities/formatDate";
import { removeDuplicatesById } from "../../utilities/removeDuplicatesById";

// Components
import CardContent from "../cards/card/CardContent";
import Cards from "../cards/Cards";
import Container from "../container/Container";
import ImageComponent from "../image/Image";
import BodyText from "../typography/BodyText";
import H2 from "../typography/H2";
import Article from "./Article";

type ArticleTvScrollXProps<T> = {
  name: string;
  heading: string;
  data: T[] | undefined;
};

export default function ArticleTvScrollX<
  T extends {
    id: number;
    poster_path: string | null;
    name: string;
    vote_average: number;
    first_air_date: string;
  }
>({ name, heading, data }: ArticleTvScrollXProps<T>) {
  if (data && data.length > 0) {
    const filtered = removeDuplicatesById(data);
    return (
      <Article name={name}>
        <Container>
          <H2 heading={heading} />
          <BodyText text={`Showing ${filtered.length} TV shows`} />
          <Cards
            getID={(item: T) => item.id}
            renderLink={(item) => `/tv/${item.id}`}
            renderItem={(item: T) => (
              <>
                <ImageComponent
                  src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                  fallback="/images/error_500x750.webp"
                  alt={item.name}
                />
                <CardContent vote={item.vote_average} heading={item.name}>
                  <BodyText
                    text={
                      item.first_air_date && formatDate(item.first_air_date)
                    }
                  />
                </CardContent>
              </>
            )}
            data={filtered}
            sort={(a, b) =>
              (b.first_air_date ? +new Date(b.first_air_date) : 0) -
              (a.first_air_date ? +new Date(a.first_air_date) : 0)
            }
          />
        </Container>
      </Article>
    );
  }
  return null;
}
