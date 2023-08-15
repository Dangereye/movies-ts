// React
import { useContext } from 'react';

// Context
import { ImagesFiltersContext } from '../../../contexts/ImagesFiltersContext';

// Icons
import { CgClose } from 'react-icons/cg';

// Components
import Container from '../../container/Container';
import ImageComponent from '../Image';
import Button from '../../buttons/Button';

export default function ImageModal() {
  const { state, dispatch } = useContext(ImagesFiltersContext);

  const images =
    state.languages[state.display.show_media_type][
      state.languages.active_language
    ];

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
        <Button
          name={<CgClose />}
          variant='btn--modal-close'
          onClick={closeModal}
        />

        <div className='image-modal__content'>
          {images?.map((image, i) => {
            if (state.modal.index === i) {
              return (
                <div className='img' key={image.file_path}>
                  <ImageComponent
                    key={image.file_path}
                    file_path='https://image.tmdb.org/t/p/original/'
                    filename={image.file_path}
                    fallback='/images/error_500x750.webp'
                    width={image.width}
                    aspect_ratio={
                      state.display.show_media_type === 'backdrops'
                        ? 'aspect-ratio-16-9'
                        : 'aspect-ratio-2-3'
                    }
                    alt={`${state.display.show_media_type}-${i}`}
                  />
                </div>
              );
            }
            return null;
          })}
        </div>
      </Container>
    </div>
  );
}
