// React
import { useContext } from 'react';

// Interfaces
import { IVideo } from '../../../interfaces/IVideo';

// Contexts
import { VideoContext } from '../../../contexts/VideoContext';

// Components
import ImageComponent from '../../image/Image';
import BodyText from '../../typography/BodyText';
import HDiv from '../../typography/HDiv';

// Icons
import { GoPlay } from 'react-icons/go';

// Utilities
import { formatDate } from '../../../utilities/formatDate';

type VideoProps = {
  data: IVideo;
};

export default function Video({ data }: VideoProps) {
  const { setVideoPlayer } = useContext(VideoContext);

  const openPlayer = () => {
    setVideoPlayer({ isOpen: true, key: data.key });
  };
  return (
    <div className='video'>
      <div className='video-image' onClick={openPlayer}>
        <ImageComponent
          base_url='https://i.ytimg.com/vi'
          filename={data.key}
          youTube='/hqdefault.jpg'
          fallback='/images/error_600x450.webp'
          width={600}
          aspect_ratio='aspect-ratio-16-9'
          alt={data.name}
          loading='lazy'
        />
        <div className='play-icon__bg'></div>
        <GoPlay className='play-icon' />
      </div>
      <div className='content'>
        <HDiv variant='heading--h4' heading={data.name} />
        <BodyText text={formatDate(data.published_at)} />
      </div>
    </div>
  );
}
