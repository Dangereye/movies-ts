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

type ArticleTvCreditsProps = {
  data: IPersonTvCast[] | undefined;
};

export default function ArticleTvCredits({ data }: ArticleTvCreditsProps) {
  if (data && data.length > 0) {
    const filtered = removeDuplicatesById(data);
    return (
      <Article name="tv-credits">
        <Container>
          <H2 heading="TV credits" />
          <BodyText text={`Cast for ${filtered.length} TV Shows`} />
          <Cards
            getID={(item: IPersonTvCast) => item.id}
            renderLink={(item) => `/tv/${item.id}`}
            renderItem={(item: IPersonTvCast) => (
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
              +new Date(b.first_air_date) - +new Date(a.first_air_date)
            }
          />
        </Container>
      </Article>
    );
  }
  return null;
}
