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
              <div key={`wrapper-${img.file_path}`} className='img'>
                <ImageComponent
                  key={img.file_path}
                  src={
                    img.file_path
                      ? `https://image.tmdb.org/t/p/w500/${img.file_path}`
                      : '/images/error_500x750.webp'
                  }
                  fallback='/images/error_500x750.webp'
                  width={300}
                  alt={`Profile-${i}`}
                />
              </div>
            ))}
          </div>
        </Container>
      </Article>
    );
  }

  return null;
}
