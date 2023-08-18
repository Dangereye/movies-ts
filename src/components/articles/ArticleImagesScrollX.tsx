// React
import { useContext } from 'react';

// React router
import { Link, useLocation } from 'react-router-dom';

// Contexts
import { ImagesFiltersContext } from '../../contexts/ImagesFiltersContext';

// Components
import Container from '../container/Container';
import H2 from '../typography/H2';
import Article from './Article';
import Button from '../buttons/Button';
import Wrapper from '../wrapper/Wrapper';
import BodyText from '../typography/BodyText';
import ImageComponent from '../image/Image';

export default function ArticleImages() {
  const { state, dispatch } = useContext(ImagesFiltersContext);
  const { pathname } = useLocation();
  const images =
    state.languages[state.display.show_media_type][
      state.languages.active_language
    ];

  const updateImages = (value: 'posters' | 'backdrops') => {
    dispatch({
      type: 'SET_FILTERS',
      payload: {
        ...state,
        display: { ...state.display, show_media_type: value },
      },
    });
  };

  const openModal = (index: number) => {
    dispatch({
      type: 'SET_FILTERS',
      payload: { ...state, modal: { is_active: true, index } },
    });
  };

  if (images && images?.length > 1) {
    return (
      <Article name='images'>
        <Container>
          <H2 heading={state?.display?.show_media_type} />
          <Wrapper name='image options' variant='flex'>
            {state?.display?.results?.posters > 0 && (
              <Button
                name={
                  <>
                    <span className='name'>Posters</span>
                    <span className='qty'>
                      {state?.display?.results?.posters}
                    </span>
                  </>
                }
                active={state?.display?.show_media_type === 'posters'}
                variant='btn--tertiary'
                onClick={() => updateImages('posters')}
              />
            )}
            {state.display.results.backdrops > 0 && (
              <Button
                name={
                  <>
                    <span className='name'>Backdrops</span>
                    <span className='qty'>
                      {state?.display?.results?.backdrops}
                    </span>
                  </>
                }
                active={state?.display?.show_media_type === 'backdrops'}
                variant='btn--tertiary'
                onClick={() => updateImages('backdrops')}
              />
            )}
          </Wrapper>
          <BodyText
            text={`Showing ${
              images?.length > 10
                ? '10'
                : images?.length < 10
                ? images?.length
                : 0
            } ${state?.display?.show_media_type}`}
          />
          <div className='images__scroll'>
            {images
              ?.filter((image, i) => i < 10)
              .map((image, i) => (
                <div key={image.file_path} onClick={() => openModal(i)}>
                  <ImageComponent
                    key={image.file_path}
                    base_url='https://image.tmdb.org/t/p/'
                    filename={image.file_path}
                    poster_sizes={
                      state.display.show_media_type === 'posters' ? 'w300' : ''
                    }
                    backdrop_sizes={
                      state.display.show_media_type === 'backdrops'
                        ? 'w780'
                        : ''
                    }
                    fallback={
                      state.display.show_media_type === 'posters'
                        ? '/images/error_300x450.webp'
                        : '/images/error_500x281.webp'
                    }
                    width={
                      state.display.show_media_type === 'posters' ? 300 : 500
                    }
                    aspect_ratio={
                      state.display.show_media_type === 'posters'
                        ? 'aspect-ratio-2-3'
                        : 'aspect-ratio-16-9'
                    }
                    alt={`${state?.display?.show_media_type}-${i}`}
                    loading='lazy'
                  />
                </div>
              ))}
          </div>
          {(state?.display?.results?.posters > 10 ||
            state?.display?.results?.backdrops > 10) && (
            <div className='buttons'>
              <Link
                to={
                  pathname.includes('movie')
                    ? `/movies/${state.id}/images`
                    : `/tv/${state.id}/images`
                }
                className='btn btn--tertiary'
              >
                view all images
              </Link>
            </div>
          )}
        </Container>
      </Article>
    );
  }
  return null;
}
