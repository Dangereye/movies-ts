import { useParams } from "react-router-dom";
import ArticleMoviesScrollX from "../components/articles/ArticleMoviesScrollX";
import ArticleTVShowsScrollX from "../components/articles/ArticleTVShowsScrollX";

// Components
import Header from "../components/header/Header";
import Navigation from "../components/navigation/Navigation";
import Statistics from "../components/statistics/Statistics";
import SubNavbar from "../components/sub_navbar/SubNavbar";
import BodyText from "../components/typography/BodyText";
import ExpandableText from "../components/typography/ExpandableText";
import H2 from "../components/typography/H2";
import HDiv from "../components/typography/HDiv";
import Wrapper from "../components/wrapper/Wrapper";
import { peoplePages } from "../data/peoplePages";

// Hooks
import useMakeQuery from "../hooks/useMakeQuery";

// Interfaces
import { IPerson } from "../interfaces/IPerson";
import { formatDate } from "../utilities/formatDate";

export default function TvDetails() {
  const { personId } = useParams();
  const {
    data: person,
    isError,
    isLoading,
  } = useMakeQuery<IPerson>(
    `person-${personId}`,
    `person/${personId}`,
    `&append_to_response=combined_credits,movie_credits,tv_credits,external_ids`
  );

  if (isLoading) {
    return <H2 heading="Loading" />;
  }

  if (isError) {
    return <H2 heading="Error" />;
  }

  return (
    <>
      <SubNavbar>
        <Navigation
          data={peoplePages}
          getID={(item) => item.name}
          getLink={(item) => item.link}
          renderItem={(item) => item.name}
          variant="horizontal"
        />
      </SubNavbar>
      <Header
        image={person?.profile_path}
        alt={person?.name}
        title={person?.name}
      >
        <Wrapper name="info-bar" variant="flex">
          <BodyText text={`Born: ${formatDate(person?.birthday)}`} />
          {person?.deathday && (
            <BodyText text={`Died: ${formatDate(person.deathday)}`} />
          )}
          <BodyText text={person?.place_of_birth} />
        </Wrapper>
        <HDiv variant="heading--h4" heading="Biography" />
        <ExpandableText text={person?.biography} lines={8} />
      </Header>
      <Statistics person={person} />
      <ArticleMoviesScrollX
        name="movie-acting-credits"
        heading="Movie acting credits"
        data={person?.movie_credits.cast}
        sort={(a, b) =>
          +new Date(b.release_date ? b.release_date : 0) -
          +new Date(a.release_date ? a.release_date : 0)
        }
      />
      <ArticleMoviesScrollX
        name="movie-production-credits"
        heading="Movie production credits"
        data={person?.movie_credits.crew}
        sort={(a, b) =>
          +new Date(b.release_date ? b.release_date : 0) -
          +new Date(a.release_date ? a.release_date : 0)
        }
      />
      <ArticleTVShowsScrollX
        name="tv-acting-credits"
        heading="Tv acting credits"
        data={person?.tv_credits.cast}
        sort={(a, b) =>
          +new Date(b.first_air_date ? b.first_air_date : 0) -
          +new Date(a.first_air_date ? a.first_air_date : 0)
        }
      />
      <ArticleTVShowsScrollX
        name="tv-production-credits"
        heading="Tv production credits"
        data={person?.tv_credits.crew}
        sort={(a, b) =>
          +new Date(b.first_air_date ? b.first_air_date : 0) -
          +new Date(a.first_air_date ? a.first_air_date : 0)
        }
      />
    </>
  );
}
