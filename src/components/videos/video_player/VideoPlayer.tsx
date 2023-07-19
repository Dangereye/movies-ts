import { useContext } from 'react';
import { VideoContext } from '../../../contexts/VideoContext';
import Button from '../../buttons/Button';
import { CgClose } from 'react-icons/cg';

export default function VideoPlayer() {
  const { videoPlayer, setVideoPlayer } = useContext(VideoContext);

  const closePlayer = () => {
    setVideoPlayer({ isOpen: false, key: '' });
  };
  return (
    <>
      {videoPlayer.isOpen && (
        <div className='video-player'>
          <Button
            name={<CgClose />}
            variant='btn--modal-close'
            onClick={closePlayer}
          />
          <iframe
            width='1920'
            height='1080'
            src={`https://www.youtube.com/embed/${videoPlayer.key}`}
            title='YouTube video player'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            allowFullScreen
          ></iframe>
        </div>
      )}
    </>
  );
}
