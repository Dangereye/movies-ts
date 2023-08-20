// Interfaces
import { IEpisodes } from '../../interfaces/IEpisodes';

// Components
import Container from '../container/Container';
import Episode from '../episodes/episode/Episode';
import H2 from '../typography/H2';
import Article from './Article';

type ArticleSeasonEpisodesProps = {
  data: IEpisodes[] | undefined;
};

export default function ArticleSeasonEpisodes({
  data,
}: ArticleSeasonEpisodesProps) {
  if (data?.length) {
    return (
      <Article name='season-episodes'>
        <Container>
          <H2 heading='Episodes' />
          <div className='episodes'>
            {data.map((episode) => (
              <Episode key={episode.id} episode={episode} />
            ))}
          </div>
        </Container>
      </Article>
    );
  }

  return null;
}
