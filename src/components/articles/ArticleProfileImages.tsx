// Components
import Container from '../container/Container';
import ImageComponent from '../image/Image';
import BodyText from '../typography/BodyText';
import H2 from '../typography/H2';
import Article from './Article';

// Interfaces
import { IImages } from '../../interfaces/IImages';

type ArticleProfileImagesProps = {
  data: IImages[] | undefined;
};

export default function ArticleProfileImages({
  data,
}: ArticleProfileImagesProps) {
  if (data && data.length > 1) {
    return (
      <Article name='profile-pics'>
        <Container>
          <H2 heading='Profiles' />
          <BodyText text={`Showing ${data.length} profiles `} />
          <div className='images__scroll'>
            {data?.map((img, i) => (
              <ImageComponent
                key={img.file_path}
                base_url='https://image.tmdb.org/t/p/'
                profile_sizes='h632'
                filename={img.file_path}
                fallback='/images/error_300x450.webp'
                width={300}
                aspect_ratio='aspect-ratio-2-3'
                alt={`Profile-${i}`}
                loading='lazy'
              />
            ))}
          </div>
        </Container>
      </Article>
    );
  }

  return null;
}
