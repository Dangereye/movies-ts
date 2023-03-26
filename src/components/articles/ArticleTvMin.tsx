// Interfaces
import { ITVShowMin } from "../../interfaces/ITVShowMin";

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

type ArticleTvMinProps={
    variant:"scroll-x"|"list";
    name:string;
    heading:string;
    data:ITVShowMin[]|undefined;
}

export default function ArticleTvMin({variant,name,heading,data}:ArticleTvMinProps){
    if(data && data.length>0){
        const filtered = removeDuplicatesById(data);
        return (
          <Article name={name}>
            <Container>
              <H2 heading={heading} />
              <BodyText text={`Showing ${filtered.length} TV shows`} />
              <Cards
              variant={variant}
                getId={(item) => item.id}
                getLink={(item) => `/tv/${item.id}`}
                renderContent={(item) => (
                  <>
                    <ImageComponent
                      src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                      fallback="/images/error_500x750.webp"
                      alt={item.name}
                    />
                    <CardContent vote={item.vote_average} heading={item.name}>
                      <BodyText
                        text={
                          item.first_air_date
                            ? formatDate(item.first_air_date)
                            : "TBC"
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
    return null
}