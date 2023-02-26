import { removeDuplicatesById } from "../../utilities/removeDuplicatesById";
import CardContent from "../cards/card/CardContent";
import Cards from "../cards/Cards";
import Container from "../container/Container";
import ImageComponent from "../image/Image";
import BodyText from "../typography/BodyText";
import H2 from "../typography/H2";
import Article from "./Article";

type ArticlePeopleScrollXProps<T> = {
  name: string;
  heading: string;
  department?: boolean;
  character?: boolean;
  limit?: boolean;
  data: T[] | undefined;
};

export default function ArticlePeopleScrollX<
  T extends {
    id: number;
    name: string;
    profile_path: string | null;
    character?: string;
    known_for_department?: string;
    popularity: number;
  }
>({
  name,
  heading,
  department = false,
  character = false,
  limit = false,
  data,
}: ArticlePeopleScrollXProps<T>) {
  if (data && data.length > 0) {
    const filtered = removeDuplicatesById(data);
    return (
      <Article name={name}>
        <Container>
          <H2 heading={heading} />
          <BodyText text={`Showing ${limit ? 10 : filtered.length} people`} />
          <Cards
            getID={(item: T) => item.id}
            renderLink={(item) => `/people/${item.id}`}
            renderItem={(item: T) => (
              <>
                <ImageComponent
                  src={`https://image.tmdb.org/t/p/w500/${item.profile_path}`}
                  fallback="/images/error_500x750.webp"
                  alt={item.name}
                />
                <CardContent heading={item.name}>
                  {character && <BodyText text={item.character} />}
                  {department && <BodyText text={item.known_for_department} />}
                </CardContent>
              </>
            )}
            data={filtered}
            sort={(a, b) =>
              (b.popularity ? b.popularity : 0) -
              (a.popularity ? a.popularity : 0)
            }
            limit={limit}
          />
        </Container>
      </Article>
    );
  }
  return null;
}
