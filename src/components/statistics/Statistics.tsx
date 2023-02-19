// Icons
import { BsFacebook, BsGlobe, BsInstagram, BsTwitter } from "react-icons/bs";

// Interfaces
import { IMovieFull } from "../../interfaces/IMovieFull";
import { IPerson } from "../../interfaces/IPerson";
import { ITVShowFull } from "../../interfaces/ITVShowFull";

// Components
import Container from "../container/Container";
import Wrapper from "../wrapper/Wrapper";
import SocialIcon from "./social_icon/SocialIcon";
import Statistic from "./Statistic/Statistic";

type StatisticsProps = {
  movie?: IMovieFull;
  tv?: ITVShowFull;
  person?: IPerson;
};

export default function Statistics({ movie, tv, person }: StatisticsProps) {
  if (movie) {
    return (
      <div className="statistics">
        <Container>
          <Wrapper name="stats" variant="flex">
            <Statistic
              heading={movie.status ? movie.status : "n/a"}
              text="Status"
            />
            <Statistic
              heading={
                movie.budget ? `$${movie.budget.toLocaleString()}` : "n/a"
              }
              text="Budget"
            />
            <Statistic
              heading={
                movie.revenue ? `$${movie?.revenue.toLocaleString()}` : "n/a"
              }
              text="Revenue"
            />
          </Wrapper>
          <Wrapper name="social-icons" variant="flex">
            <SocialIcon
              anchor={
                movie.external_ids.facebook_id
                  ? `https://www.facebook.com/${movie.external_ids.facebook_id}`
                  : null
              }
              icon={<BsFacebook />}
            />
            <SocialIcon
              anchor={
                movie.external_ids.twitter_id
                  ? `https://www.twitter.com/${movie.external_ids.twitter_id}`
                  : null
              }
              icon={<BsTwitter />}
            />
            <SocialIcon
              anchor={
                movie.external_ids.instagram_id
                  ? `https://www.instagram.com/${movie.external_ids.instagram_id}`
                  : null
              }
              icon={<BsInstagram />}
            />
            <SocialIcon anchor={movie?.homepage} icon={<BsGlobe />} />
          </Wrapper>
        </Container>
      </div>
    );
  }

  if (tv) {
    return (
      <div className="statistics">
        <Container>
          <Wrapper name="stats" variant="flex">
            <Statistic heading={tv.status ? tv.status : "n/a"} text="Status" />
            <Statistic
              heading={tv.number_of_seasons ? tv.number_of_seasons : "n/a"}
              text="Season(s)"
            />
            <Statistic
              heading={tv.number_of_episodes ? tv.number_of_episodes : "n/a"}
              text="Episode(s)"
            />
          </Wrapper>
          <Wrapper name="social-icons" variant="flex">
            <SocialIcon
              anchor={
                tv.external_ids.facebook_id
                  ? `https://www.facebook.com/${tv.external_ids.facebook_id}`
                  : null
              }
              icon={<BsFacebook />}
            />
            <SocialIcon
              anchor={
                tv.external_ids.twitter_id
                  ? `https://www.twitter.com/${tv.external_ids.twitter_id}`
                  : null
              }
              icon={<BsTwitter />}
            />
            <SocialIcon
              anchor={
                tv.external_ids.instagram_id
                  ? `https://www.instagram.com/${tv.external_ids.instagram_id}`
                  : null
              }
              icon={<BsInstagram />}
            />
            <SocialIcon anchor={tv?.homepage} icon={<BsGlobe />} />
          </Wrapper>
        </Container>
      </div>
    );
  }

  if (person) {
    return (
      <div className="statistics">
        <Container>
          <Wrapper name="stats" variant="flex">
            <Statistic
              heading={
                person.known_for_department
                  ? person.known_for_department
                  : "n/a"
              }
              text="Known for"
            />
            <Statistic
              heading={
                person.movie_credits.cast.length > 0
                  ? person.movie_credits.cast.length
                  : "n/a"
              }
              text="Movie credits"
            />
            <Statistic
              heading={
                person.tv_credits.cast.length > 0
                  ? person.tv_credits.cast.length
                  : "n/a"
              }
              text="TV credits"
            />
          </Wrapper>
          <Wrapper name="social-icons" variant="flex">
            <SocialIcon
              anchor={
                person.external_ids.facebook_id
                  ? `https://www.facebook.com/${person?.external_ids.facebook_id}`
                  : null
              }
              icon={<BsFacebook />}
            />
            <SocialIcon
              anchor={
                person.external_ids.twitter_id
                  ? `https://www.twitter.com/${person.external_ids.twitter_id}`
                  : null
              }
              icon={<BsTwitter />}
            />
            <SocialIcon
              anchor={
                person.external_ids.instagram_id
                  ? `https://www.instagram.com/${person.external_ids.instagram_id}`
                  : null
              }
              icon={<BsInstagram />}
            />
            <SocialIcon anchor={person?.homepage} icon={<BsGlobe />} />
          </Wrapper>
        </Container>
      </div>
    );
  }

  return null;
}
