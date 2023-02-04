// Components
import CardContent from "../cards/card/CardContent";
import Cards from "../cards/Cards";
import Container from "../container/Container";
import ImageComponent from "../image/Image";
import H2 from "../typography/H2";
import Article from "./Article";

// Interfaces
import { ICast } from "../../interfaces/ICast";

type TopBilledCastProps = {
  data: ICast[] | undefined;
};

export default function ArticleTopBilledCast({ data }: TopBilledCastProps) {
  if (data && data.length > 0) {
    return (
      <Article name="article__top-billed-cast">
        <Container>
          <H2 heading="Top billed cast" />
          <Cards
            getID={(item: ICast) => item.id}
            renderLink={(item) => `/person/${item.id}`}
            renderItem={(item: ICast) => (
              <>
                <ImageComponent
                  src={`https://image.tmdb.org/t/p/w500/${item.profile_path}`}
                  fallback="/images/error_500x750.webp"
                  alt={item.name}
                />
                <CardContent heading={item.name} body={item.character} />
              </>
            )}
            data={data}
            sort={(a, b) => b.popularity - a.popularity}
            limit
          />
        </Container>
      </Article>
    );
  }
  return null;
}
