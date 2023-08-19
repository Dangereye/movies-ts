// Interfaces
import { IEpisodes } from '../../../interfaces/IEpisodes';

// Components
import ImageComponent from '../../image/Image';
import StarRating from '../../star_rating/StarRating';
import BodyText from '../../typography/BodyText';
import HDiv from '../../typography/HDiv';
import SmallText from '../../typography/SmallText';
import Wrapper from '../../wrapper/Wrapper';

// Utilities
import { formatDate } from '../../../utilities/formatDate';
import { formatRuntime } from '../../../utilities/formatRuntime';

type EpisodeProps = {
  episode: IEpisodes;
};

export default function Episode({ episode }: EpisodeProps) {
  return (
    <div className='episode'>
      <ImageComponent
        base_url='https://image.tmdb.org/t/p/'
        still_sizes='original'
        filename={episode.still_path}
        width={600}
        aspect_ratio='aspect-ratio-16-9'
        alt={episode.name}
        fallback='/images/error_1040x585.webp'
        loading='lazy'
      />
      <div className='content'>
        <Wrapper name='episode-header' variant='flex'>
          <HDiv
            variant='heading--h4'
            heading={`${episode.episode_number}. ${episode.name}`}
          />
          <BodyText text={formatRuntime(episode.runtime)} />
        </Wrapper>
        <SmallText variant='episode-date' text={formatDate(episode.air_date)} />
        <BodyText text={episode.overview} />
        <Wrapper name='episode-votes' variant='flex'>
          <StarRating rating={episode.vote_average} />
          <SmallText
            variant='season-vote-count'
            text={`${episode.vote_count} votes`}
          />
        </Wrapper>
      </div>
    </div>
  );
}
