// React
import { useContext } from 'react';

// Context
import { ImagesFiltersContext } from '../../contexts/ImagesFiltersContext';

// Interfaces
import { IImages } from '../../interfaces/IImages';

// Components
import NoResults from '../typography/NoResults';
import ImageComponent from '../image/Image';
import Article from './Article';
import Container from '../container/Container';
import MobileSidebarFiltersButtons from '../sidebar/mobile_sidebar_filters_buttons/MobileSidebarFiltersButtons';

type ArticleImageListProps = {
  images: IImages[] | undefined;
  openModal: (index: number) => void;
};

export default function ArticleImageList({
  images,
  openModal,
}: ArticleImageListProps) {
  const { state } = useContext(ImagesFiltersContext);
  if (images && images.length > 0) {
    return (
      <Article name={state.display.show_media_type}>
        <Container>
          <MobileSidebarFiltersButtons />
          <div className='images__list'>
            {images?.length ? (
              images.map((image, i) => (
                <div
                  className='img'
                  key={image.file_path}
                  onClick={() => openModal(i)}
                >
                  <ImageComponent
                    key={image.file_path}
                    base_url='https://image.tmdb.org/t/p/'
                    filename={image.file_path}
                    poster_sizes={
                      state.display.show_media_type === 'posters' ? 'w300' : ''
                    }
                    backdrop_sizes={
                      state.display.show_media_type === 'posters' ? '' : 'w780'
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
                    alt={`${state.display.show_media_type}-${i}`}
                  />
                </div>
              ))
            ) : (
              <NoResults
                text={`Please select a language to display ${state.display.show_media_type}.`}
              />
            )}
          </div>
        </Container>
      </Article>
    );
  }
  return null;
}
