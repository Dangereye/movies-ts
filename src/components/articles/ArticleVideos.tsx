// React
import { useState, useEffect } from 'react';

// Interfaces
import { IVideo } from '../../interfaces/IVideo';

// Components
import Button from '../buttons/Button';
import Container from '../container/Container';
import BodyText from '../typography/BodyText';
import H2 from '../typography/H2';
import Video from '../videos/video/Video';
import Wrapper from '../wrapper/Wrapper';
import Article from './Article';

// Utilities
import { stringToDate } from '../../utilities/stringToDate';

type ActiveProps =
  | 'trailer'
  | 'teaser'
  | 'clip'
  | 'behind_the_scenes'
  | 'blooper'
  | 'featurette';

type VideosProps = {
  trailer: IVideo[];
  teaser: IVideo[];
  clip: IVideo[];
  behind_the_scenes: IVideo[];
  blooper: IVideo[];
  featurette: IVideo[];
};

const initialVideos = {
  trailer: [],
  teaser: [],
  clip: [],
  behind_the_scenes: [],
  blooper: [],
  featurette: [],
} as VideosProps;

type VideoArticleProps = {
  data: IVideo[] | undefined;
};

export default function ArticleVideos({ data }: VideoArticleProps) {
  const [videos, setVideos] = useState(initialVideos);
  const [active, setActive] = useState<ActiveProps>('trailer');

  useEffect(() => {
    let obj = initialVideos;

    const organiseVideos = () => {
      const trailer: IVideo[] = [];
      const teaser: IVideo[] = [];
      const clip: IVideo[] = [];
      const behind_the_scenes: IVideo[] = [];
      const blooper: IVideo[] = [];
      const featurette: IVideo[] = [];

      data?.forEach((video) => {
        if (video.type === 'Trailer') {
          trailer.push(video);
        }
        if (video.type === 'Teaser') {
          teaser.push(video);
        }
        if (video.type === 'Clip') {
          clip.push(video);
        }
        if (video.type === 'Behind the Scenes') {
          behind_the_scenes.push(video);
        }
        if (video.type === 'Blooper') {
          blooper.push(video);
        }
        if (video.type === 'Featurette') {
          featurette.push(video);
        }

        obj = {
          trailer,
          teaser,
          clip,
          behind_the_scenes,
          blooper,
          featurette,
        };

        return obj;
      });
    };

    organiseVideos();
    setVideos(obj);
  }, [data]);

  const makePlural = (word: string) => {
    if (word.match(/\w{4,}s/)) {
      return word.replaceAll('_', ' ');
    }
    return `${word.replaceAll('_', ' ')}s`;
  };

  const updateVideos = (value: ActiveProps) => {
    setActive(value);
  };

  if (data && data.length > 0) {
    return (
      <Article name='videos'>
        <Container>
          <H2 heading={makePlural(active)} />
          <Wrapper name='video-options' variant='flex'>
            <Button
              name={
                <>
                  <span className='name'>Trailers</span>
                  <span className='qty'>{videos.trailer.length}</span>
                </>
              }
              active={active === 'trailer'}
              variant='btn--tertiary'
              onClick={(e) => updateVideos('trailer')}
            />

            <Button
              name={
                <>
                  <span className='name'>Teasers</span>
                  <span className='qty'>{videos.teaser.length}</span>
                </>
              }
              active={active === 'teaser'}
              variant='btn--tertiary'
              onClick={(e) => updateVideos('teaser')}
            />

            <Button
              name={
                <>
                  <span className='name'>Clips</span>
                  <span className='qty'>{videos.clip.length}</span>
                </>
              }
              active={active === 'clip'}
              variant='btn--tertiary'
              onClick={(e) => updateVideos('clip')}
            />

            <Button
              name={
                <>
                  <span className='name'>Behind the Scenes</span>
                  <span className='qty'>{videos.behind_the_scenes.length}</span>
                </>
              }
              active={active === 'behind_the_scenes'}
              variant='btn--tertiary'
              onClick={(e) => updateVideos('behind_the_scenes')}
            />

            <Button
              name={
                <>
                  <span className='name'>Bloopers</span>
                  <span className='qty'>{videos.blooper.length}</span>
                </>
              }
              active={active === 'blooper'}
              variant='btn--tertiary'
              onClick={(e) => updateVideos('blooper')}
            />

            <Button
              name={
                <>
                  <span className='name'>Featurettes</span>
                  <span className='qty'>{videos.featurette.length}</span>
                </>
              }
              active={active === 'featurette'}
              variant='btn--tertiary'
              onClick={(e) => updateVideos('featurette')}
            />
          </Wrapper>

          <div className='videos'>
            {videos[active].length > 0 ? (
              videos[active]
                .sort(
                  (a, b) =>
                    stringToDate(a.published_at) - stringToDate(b.published_at)
                )
                .map((video) => <Video key={video.id} data={video} />)
            ) : (
              <>
                <BodyText
                  text={`No ${active.replaceAll('_', ' ')} videos available.`}
                />
              </>
            )}
          </div>
        </Container>
      </Article>
    );
  }
  return null;
}
