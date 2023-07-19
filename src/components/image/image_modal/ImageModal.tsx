import { useContext, useState } from 'react';
import { ImagesFiltersContext } from '../../../contexts/ImagesFiltersContext';
import { CgClose } from 'react-icons/cg';
import Container from '../../container/Container';
import H2 from '../../typography/H2';
import ImageComponent from '../Image';
import Button from '../../buttons/Button';
import BodyText from '../../typography/BodyText';

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
                    src={`https://image.tmdb.org/t/p/original/${image.file_path}`}
                    fallback='/images/error_500x750.webp'
                    width={image.width}
                    height={image.height}
                    alt={`${state.display.show_media_type}-${i}`}
                  />
                </div>
              );
            }
          })}
        </div>
      </Container>
    </div>
  );
}
