// Icons
import { BsFacebook, BsGlobe, BsInstagram, BsTwitter } from 'react-icons/bs';

// Interfaces
import { IMovieFull } from '../../interfaces/IMovieFull';
import { IPerson } from '../../interfaces/IPerson';
import { ITVShowFull } from '../../interfaces/ITVShowFull';

// Components
import Container from '../container/Container';
import Wrapper from '../wrapper/Wrapper';
import SocialIcon from './social_icon/SocialIcon';
import Statistic from './Statistic/Statistic';

type StatisticsProps = {
  movie?: IMovieFull;
  tv?: ITVShowFull;
  person?: IPerson;
};

export default function Statistics({ movie, tv, person }: StatisticsProps) {
  if (movie) {
    return (
      <div className='statistics'>
        <Container>
          <Wrapper name='stats' variant='flex'>
            <Statistic heading={movie?.status} text='Status' />
            <Statistic
              heading={
                movie?.budget ? `$${movie?.budget.toLocaleString()}` : null
              }
              text='Budget'
            />
            <Statistic
              heading={
                movie?.revenue ? `$${movie?.revenue.toLocaleString()}` : null
              }
              text='Revenue'
            />
          </Wrapper>
          <Wrapper name='social-icons' variant='flex'>
            <SocialIcon
              anchor={
                movie?.external_ids?.facebook_id
                  ? `https://www.facebook.com/${movie.external_ids.facebook_id}`
                  : null
              }
              icon={<BsFacebook />}
            />
            <SocialIcon
              anchor={
                movie?.external_ids?.twitter_id
                  ? `https://www.twitter.com/${movie.external_ids.twitter_id}`
                  : null
              }
              icon={<BsTwitter />}
            />
            <SocialIcon
              anchor={
                movie?.external_ids?.instagram_id
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
      <div className='statistics'>
        <Container>
          <Wrapper name='stats' variant='flex'>
            <Statistic heading={tv?.status} text='Status' />
            <Statistic heading={tv?.number_of_seasons} text='Seasons' />
            <Statistic heading={tv?.number_of_episodes} text='Episodes' />
          </Wrapper>
          <Wrapper name='social-icons' variant='flex'>
            <SocialIcon
              anchor={
                tv?.external_ids?.facebook_id
                  ? `https://www.facebook.com/${tv.external_ids.facebook_id}`
                  : null
              }
              icon={<BsFacebook />}
            />
            <SocialIcon
              anchor={
                tv?.external_ids?.twitter_id
                  ? `https://www.twitter.com/${tv.external_ids.twitter_id}`
                  : null
              }
              icon={<BsTwitter />}
            />
            <SocialIcon
              anchor={
                tv?.external_ids?.instagram_id
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
      <div className='statistics'>
        <Container>
          <Wrapper name='stats' variant='flex'>
            <Statistic
              heading={person?.known_for_department}
              text='Known for'
            />
            <Statistic
              heading={person?.movie_credits?.cast?.length}
              text='Movie credits'
            />
            <Statistic
              heading={person?.movie_credits?.crew?.length}
              text='Movie crew'
            />
            <Statistic
              heading={person?.tv_credits?.cast?.length}
              text='TV credits'
            />
            <Statistic
              heading={person?.tv_credits?.crew?.length}
              text='TV crew'
            />
          </Wrapper>
          <Wrapper name='social-icons' variant='flex'>
            <SocialIcon
              anchor={
                person?.external_ids?.facebook_id
                  ? `https://www.facebook.com/${person.external_ids.facebook_id}`
                  : null
              }
              icon={<BsFacebook />}
            />
            <SocialIcon
              anchor={
                person?.external_ids?.twitter_id
                  ? `https://www.twitter.com/${person.external_ids.twitter_id}`
                  : null
              }
              icon={<BsTwitter />}
            />
            <SocialIcon
              anchor={
                person?.external_ids?.instagram_id
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
