import Article from "../components/article/Article";
import Container from "../components/container/Container";
import H2 from "../components/typography/H2";
import Main from "../components/main/Main";
import Cards from "../components/cards/Cards";
import { useQuery } from "@tanstack/react-query";

const fetchData = async () => {
  const res = await fetch(
    "https://api.themoviedb.org/3/trending/movie/week?api_key=2f965fedbcdec55779f7e2e60eb62e59"
  );
  return res.json();
};

export default function LandingPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["trending movies"],
    queryFn: fetchData,
  });

  if (isLoading) {
    return <H2 heading="loading" />;
  }

  if (isError) {
    return <H2 heading="loading" />;
  }

  return (
    <>
      <Main>
        <Article>
          <Container>
            <H2 heading="Movies trending this week" />
            <Cards list={data.results} />
          </Container>
        </Article>
      </Main>
    </>
  );
}
