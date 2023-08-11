import { IEpisodes } from '../../interfaces/IEpisodes';
import { formatDate } from '../../utilities/formatDate';
import { formatRuntime } from '../../utilities/formatRuntime';
import Container from '../container/Container';
import ImageComponent from '../image/Image';
import StarRating from '../star_rating/StarRating';
import BodyText from '../typography/BodyText';
import H2 from '../typography/H2';
import HDiv from '../typography/HDiv';
import SmallText from '../typography/SmallText';
import Wrapper from '../wrapper/Wrapper';
import Article from './Article';

type ArticleSeasonEpisodesProps = {
  data: IEpisodes[] | undefined;
};

export default function ArticleSeasonEpisodes({
  data,
}: ArticleSeasonEpisodesProps) {
  if (data) {
    return (
      <Article name='season-episodes'>
        <Container>
          <H2 heading='Episodes' />
          <div className='episodes'>
            {data.map((episode) => (
              <div className='episode' key={episode.id}>
                <ImageComponent
                  file_path='https://image.tmdb.org/t/p/w500/'
                  filename={episode.still_path}
                  width={500}
                  aspect_ratio='aspect-ratio-16-9'
                  alt={episode.name}
                  fallback='/images/error_600x338.webp'
                />
                <div className='content'>
                  <Wrapper name='episode-header' variant='flex'>
                    <HDiv
                      variant='heading--h4'
                      heading={`${episode.episode_number}. ${episode.name}`}
                    />
                    <BodyText text={formatRuntime(episode.runtime)} />
                  </Wrapper>
                  <SmallText
                    variant='episode-date'
                    text={formatDate(episode.air_date)}
                  />
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
            ))}
          </div>
        </Container>
      </Article>
    );
  }

  return null;
}
