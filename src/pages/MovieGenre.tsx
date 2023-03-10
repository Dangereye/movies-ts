import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Article from "../components/articles/Article";
import Button from "../components/buttons/Button";
import CardContent from "../components/cards/card/CardContent";
import Container from "../components/container/Container";
import Header from "../components/header/Header";
import ImageComponent from "../components/image/Image";
import Layout from "../components/layout/Layout";
import Main from "../components/main/Main";
import Navigation from "../components/navigation/Navigation";
import Sidebar from "../components/sidebar/Sidebar";
import SubNavbar from "../components/sub_navbar/SubNavbar";
import BodyText from "../components/typography/BodyText";
import H1 from "../components/typography/H1";
import H2 from "../components/typography/H2";
import HDiv from "../components/typography/HDiv";
import Wrapper from "../components/wrapper/Wrapper";
import { moviePages } from "../data/moviePages";
import useMakeQuery from "../hooks/useMakeQuery";
import { IMovieGenres } from "../interfaces/IMovieGenres";
import { IMovieMin } from "../interfaces/IMovieMin";
import { IPage } from "../interfaces/IPage";
import { formatDate } from "../utilities/formatDate";

export default function MovieGenre() {
  const { genreId } = useParams();
  const [genre, setGenre] = useState<string | null>(null);

  const {
    data: movie,
    isError,
    isLoading,
  } = useMakeQuery<IPage<IMovieMin>>(
    `movie-genre-${genreId}`,
    `discover/movie`,
    `&with_genres=${genreId}`
  );

  const {
    data: genreList,
    isError: genreListIsError,
    isLoading: genreListIsLoading,
  } = useMakeQuery<IMovieGenres>(`movie-genre-list`, `genre/movie/list`);

  useEffect(() => {
    genreList?.genres?.find((g) => {
      if (`${g.id}` === genreId) {
        setGenre(g.name);
      }
    });
  }, [genreId]);

  if (isLoading || genreListIsLoading) {
    return <H2 heading="Loading" />;
  }

  if (isError || genreListIsError) {
    return <H2 heading="Error" />;
  }

  return (
    <>
      <SubNavbar>
        <Navigation
          data={moviePages}
          getID={(item) => item.name}
          getLink={(item) => item.link}
          renderItem={(item) => item.name}
          variant="horizontal"
        />
      </SubNavbar>
      <Header variant="header__min" title={`${genre} movies`} />
      <Article name="genre-movies">
        <Container>
          <Layout variant="grid grid--sidebar">
            <Sidebar>
              <HDiv variant="heading--h4" heading="genres" />
              <Wrapper name="tags" variant="flex">
                {genreList?.genres.map((g) => (
                  <Link to={`/genre/${g.id}/movie`} className="btn btn--tag">
                    {g.name}
                  </Link>
                ))}
              </Wrapper>
            </Sidebar>
            <Main>
              <div className="cards-list">
                {movie?.results.map((movie) => (
                  <Link
                    key={movie.id}
                    to={`/movies/${movie.id}`}
                    className="card"
                  >
                    <ImageComponent
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      fallback="/images/error_500x750.webp"
                      alt={movie.title}
                    />
                    <CardContent heading={movie.title}>
                      <BodyText text={`${formatDate(movie.release_date)}`} />
                    </CardContent>
                  </Link>
                ))}
              </div>
            </Main>
          </Layout>
        </Container>
      </Article>
    </>
  );
}
