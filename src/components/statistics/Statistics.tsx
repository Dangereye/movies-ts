// Interfaces
import { IPersonMovieCast } from '../../interfaces/IPersonMovieCast';
import { IPersonMovieCrew } from '../../interfaces/IPersonMovieCrew';
import { IPersonTvCrew } from '../../interfaces/IPersonTvCrew';
import { IPersonTvCast } from '../../interfaces/IPersonTvCast';

// Components
import Container from '../container/Container';
import Wrapper from '../wrapper/Wrapper';
import Statistic from './Statistic/Statistic';
import SocialIcon from './social_icon/SocialIcon';

// Icons
import { BsFacebook, BsGlobe, BsInstagram, BsTwitter } from 'react-icons/bs';

// Utilities
import { toDollars } from '../../utilities/toDollars';
import { toCommaSeperatedNumber } from '../../utilities/toCommaSeperatedNumber';

type StatisticsProps<T> = {
  data: T | undefined;
};

export default function Statistics<
  T extends {
    status?: string;
    budget?: number;
    revenue?: number;
    number_of_seasons?: number;
    number_of_episodes?: number;
    known_for_department?: string;
    movie_credits?: { cast?: IPersonMovieCast[]; crew?: IPersonMovieCrew[] };
    tv_credits?: { cast?: IPersonTvCast[]; crew?: IPersonTvCrew[] };
    external_ids?: {
      facebook_id?: string | null;
      twitter_id?: string | null;
      instagram_id?: string | null;
    };
    homepage?: string | null;
  }
>({ data }: StatisticsProps<T>) {
  return (
    <div className='statistics'>
      <Container>
        <Wrapper name='stats' variant='flex'>
          <Statistic heading={data?.status} text='Status' />
          <Statistic heading={toDollars(data?.budget)} text='Budget' />
          <Statistic heading={toDollars(data?.revenue)} text='Revenue' />
          <Statistic heading={data?.number_of_seasons} text='Seasons' />
          <Statistic
            heading={toCommaSeperatedNumber(data?.number_of_episodes)}
            text='Episodes'
          />
          <Statistic heading={data?.known_for_department} text='Known for' />
          <Statistic
            heading={data?.movie_credits?.cast?.length}
            text='Movie cast'
          />
          <Statistic
            heading={data?.movie_credits?.crew?.length}
            text='Movie crew'
          />
          <Statistic heading={data?.tv_credits?.cast?.length} text='TV cast' />
          <Statistic heading={data?.tv_credits?.crew?.length} text='TV crew' />
        </Wrapper>
        <Wrapper name='social-icons' variant='flex'>
          <SocialIcon
            anchor={
              data?.external_ids?.facebook_id
                ? `https://www.facebook.com/${data.external_ids.facebook_id}`
                : null
            }
            ariaLabel='facebook'
            icon={<BsFacebook />}
          />
          <SocialIcon
            anchor={
              data?.external_ids?.twitter_id
                ? `https://www.twitter.com/${data.external_ids.twitter_id}`
                : null
            }
            ariaLabel='twitter'
            icon={<BsTwitter />}
          />
          <SocialIcon
            anchor={
              data?.external_ids?.instagram_id
                ? `https://www.instagram.com/${data.external_ids.instagram_id}`
                : null
            }
            ariaLabel='instagram'
            icon={<BsInstagram />}
          />
          <SocialIcon
            anchor={data?.homepage}
            ariaLabel='website'
            icon={<BsGlobe />}
          />
        </Wrapper>
      </Container>
    </div>
  );
}
