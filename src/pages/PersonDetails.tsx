import { useParams } from "react-router-dom";

// Icons
import { GiHastyGrave } from "react-icons/gi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { RiCake2Line } from "react-icons/ri";

// Articles
import ArticleMoviesMin from "../components/articles/ArticleMoviesMin";
import ArticleTvScrollX from "../components/articles/ArticleTvScrollX";

// Components
import Header from "../components/header/Header";
import Navigation from "../components/navigation/Navigation";
import Statistics from "../components/statistics/Statistics";
import SubNavbar from "../components/sub_navbar/SubNavbar";
import ExpandableText from "../components/typography/ExpandableText";
import H2 from "../components/typography/H2";
import HDiv from "../components/typography/HDiv";
import IconText from "../components/typography/IconText";
import Wrapper from "../components/wrapper/Wrapper";

// Data
import { peoplePages } from "../data/peoplePages";

// Hooks
import useMakeQuery from "../hooks/useMakeQuery";

// Interfaces
import { IPerson } from "../interfaces/IPerson";

// Utilities
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
        variant="header__full"
        image={person?.profile_path}
        alt={person?.name}
        title={person?.name}
      >
        <Wrapper name="info-bar" variant="flex">
          <IconText
            name="birthday"
            icon={<RiCake2Line />}
            text={formatDate(person?.birthday)}
          />
          <IconText
            name="place-of-birth"
            icon={<HiOutlineLocationMarker />}
            text={person?.place_of_birth}
          />
          <IconText
            name="deathday"
            icon={<GiHastyGrave />}
            text={formatDate(person?.deathday)}
          />
        </Wrapper>
        <HDiv variant="heading--h4" heading="Biography" />
        <ExpandableText
          text={person?.biography ? person?.biography : "Unavailable"}
          lines={8}
        />
      </Header>
      <Statistics person={person} />

      
      <ArticleMoviesMin variant="scroll-x" name="movie-credits"heading="Movie credits" data={person?.movie_credits.cast}/>
      <ArticleTvScrollX
        name="tv-credits"
        heading="TV Credits"
        data={person?.tv_credits.cast}
      />
    </>
  );
}
