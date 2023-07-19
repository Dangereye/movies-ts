import { useContext, useState } from 'react';
import { ImagesFiltersContext } from '../../../contexts/ImagesFiltersContext';
import { CgClose } from 'react-icons/cg';
import Container from '../../container/Container';
import H2 from '../../typography/H2';
import ImageComponent from '../Image';
import Button from '../../buttons/Button';

export default function ImageModal() {
  const { state, dispatch } = useContext(ImagesFiltersContext);
  const [index, setIndex] = useState(0);

  const closeModal = () => {
    dispatch({
      type: 'SET_FILTERS',
      payload: { ...state, modal: { ...state.modal, is_active: false } },
    });
  };

  return (
    <div
      className={state.modal.is_active ? 'image-modal active' : 'image-modal'}
    >
      <Container>
        <Button name={<CgClose />} onClick={closeModal} />
        <H2 heading='Images' />
        <div className='image__scroll'>
          {state.display.show_media_type === 'posters' &&
            state.languages.posters[state.languages.active_language]?.map(
              (img, i) => (
                <ImageComponent
                  src={`https://image.tmdb.org/t/p/original/${img.file_path}`}
                  fallback=''
                  alt={`image-${i}`}
                />
              )
            )}
        </div>
      </Container>
    </div>
  );
}
