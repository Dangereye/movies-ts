// React Query
import { useQuery } from "@tanstack/react-query";

import Main from "../components/main/Main";
import Article from "../components/article/Article";
import Container from "../components/container/Container";
import H2 from "../components/typography/H2";
import Cards from "../components/cards/Cards";
import ImageComponent from "../components/image/Image";
import CardContent from "../components/cards/card/CardContent";

// Interfaces
import { IMovie } from "../interfaces/IMovie";

// Utilities
import { formatDate } from "../utilities/formatDate";

const fetchData = async (endpoint: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/${endpoint}?api_key=2f965fedbcdec55779f7e2e60eb62e59`
  );
  return res.json();
};

export default function LandingPage() {
  const {
    data: movies,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["trending movies"],
    queryFn: () => fetchData("trending/movie/week"),
  });

  if (isLoading) {
    return <H2 heading="loading" />;
  }

  if (isError) {
    return <H2 heading="Error" />;
  }

  return (
    <>
      <Main>
        <Article>
          <Container>
            <H2 heading="Movies trending this week" />
            <Cards
              getID={(item: IMovie) => item.id}
              renderLink={(item) => `/movies/${item.id}`}
              renderItem={(item: IMovie) => (
                <>
                  <ImageComponent
                    src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                    fallback="/images/error_500x750.webp"
                    alt={item.title}
                  />
                  <CardContent
                    heading={item.title}
                    body={formatDate(item.release_date)}
                  />
                </>
              )}
              data={movies.results}
            />
          </Container>
        </Article>
      </Main>
    </>
  );
}
