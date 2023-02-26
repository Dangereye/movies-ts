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
  data: T[] | undefined;
};

export default function ArticlePeopleScrollX<
  T extends {
    id: number;
    name: string;
    profile_path: string | null;
    character?: string;
    known_for_department?: string;
  }
>({ name, heading, data }: ArticlePeopleScrollXProps<T>) {
  if (data && data.length > 0) {
    return (
      <Article name={name}>
        <Container>
          <H2 heading={heading} />
          <BodyText text={`Showing ${data.length} people`} />
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
                  <BodyText text={item.character} />
                  <BodyText text={item.known_for_department} />
                </CardContent>
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
