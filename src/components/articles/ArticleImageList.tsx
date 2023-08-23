// React
import { useContext } from 'react';

// Hooks
import useCreateLanguages from '../../hooks/useCreateLanguages';

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
import BodyText from '../typography/BodyText';

type ArticleImageListProps = {
  data: IImages[] | undefined;
  openModal: (index: number) => void;
};

export default function ArticleImageList({
  data,
  openModal,
}: ArticleImageListProps) {
  const { state } = useContext(ImagesFiltersContext);

  const images =
    state.languages[state.display.show_media_type][
      state.languages.active_language
    ];

  const languages = useCreateLanguages();

  const getLanguageName = (iso_639_1: string) => {
    const language = languages.find((lang) => lang.iso_639_1 === iso_639_1);
    if (language?.english_name) {
      return language?.english_name;
    }
    return '';
  };

  const content =
    images && images?.length > 0 ? (
      <>
        <BodyText
          text={`Showing ${images.length} ${getLanguageName(
            state.languages.active_language
          )} ${state.display.show_media_type}`}
        />
        <div className='images__list'>
          {images.map((image, i) => (
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
                width={state.display.show_media_type === 'posters' ? 300 : 500}
                aspect_ratio={
                  state.display.show_media_type === 'posters'
                    ? 'aspect-ratio-2-3'
                    : 'aspect-ratio-16-9'
                }
                alt={`${state.display.show_media_type}-${i}`}
              />
            </div>
          ))}
        </div>
      </>
    ) : (
      <NoResults
        text={`Please select a ${state.display.show_media_type} language.`}
      />
    );

  return (
    <Article name={state.display.show_media_type}>
      <Container>
        <MobileSidebarFiltersButtons />
        {content}
      </Container>
    </Article>
  );
}
