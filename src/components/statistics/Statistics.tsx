// Icons
import { BsFacebook, BsGlobe, BsInstagram, BsTwitter } from "react-icons/bs";

// Interfaces
import { IMovieFull } from "../../interfaces/IMovieFull";
import { ITVShow } from "../../interfaces/ITVShow";

// Components
import Container from "../container/Container";
import Wrapper from "../wrapper/Wrapper";
import SocialIcon from "./social_icon/SocialIcon";
import Statistic from "./Statistic/Statistic";

type StatisticsProps = {
  movie?: IMovieFull;
  tv?: ITVShow;
};

export default function Statistics({ movie, tv }: StatisticsProps) {
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
              anchor={`https://www.facebook.com/${movie?.external_ids.facebook_id}`}
              icon={<BsFacebook />}
            />
            <SocialIcon
              anchor={`https://www.twitter.com/${movie?.external_ids.twitter_id}`}
              icon={<BsTwitter />}
            />
            <SocialIcon
              anchor={`https://www.instagram.com/${movie?.external_ids.instagram_id}`}
              icon={<BsInstagram />}
            />
            <SocialIcon anchor={movie?.homepage} icon={<BsGlobe />} />
          </Wrapper>
        </Container>
      </div>
    );
  }

  return null;
}
