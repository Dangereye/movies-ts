import { useState } from 'react';
import { IImages } from '../../interfaces/IImages';
import Container from '../container/Container';
import H2 from '../typography/H2';
import Article from './Article';
import Button from '../buttons/Button';
import Wrapper from '../wrapper/Wrapper';
import BodyText from '../typography/BodyText';
import ImageComponent from '../images/Image';
import { Link } from 'react-router-dom';

type ActiveProps = 'posters' | 'backdrops';

type ArticleImagesProps = {
  id: string | undefined;
  data:
    | {
        id: number;
        backdrops: IImages[];
        logos: IImages[];
        posters: IImages[];
      }
    | undefined;
};

export default function ArticleImages({ id, data }: ArticleImagesProps) {
  const [active, setActive] = useState<ActiveProps>('posters');

  const updateImages = (value: ActiveProps) => {
    setActive(value);
  };

  if (data) {
    return (
      <Article name='Article__images'>
        <Container>
          <H2 heading={active} />
          <Wrapper name='image options' variant='flex'>
            {data?.posters?.length > 0 && (
              <Button
                name={
                  <>
                    <span className='name'>Posters</span>
                    <span className='qty'>{data?.posters?.length}</span>
                  </>
                }
                active={active === 'posters'}
                variant='btn--tertiary'
                onClick={() => updateImages('posters')}
              />
            )}
            {data?.backdrops?.length > 0 && (
              <Button
                name={
                  <>
                    <span className='name'>Backdrops</span>
                    <span className='qty'>{data?.backdrops?.length}</span>
                  </>
                }
                active={active === 'backdrops'}
                variant='btn--tertiary'
                onClick={() => updateImages('backdrops')}
              />
            )}
          </Wrapper>
          <BodyText
            text={`Showing ${
              data[active].length > 10 ? '10' : data[active].length
            } ${active}`}
          />
          <div className='images'>
            {data[active].length > 0 ? (
              data[active]
                .filter((img, i) => i < 10)
                .map((img, i) => (
                  <ImageComponent
                    key={img.file_path}
                    src={`https://image.tmdb.org/t/p/w500/${img.file_path}`}
                    fallback='/images/error_500x750.webp'
                    width={img.width}
                    alt={`${active}-${i}`}
                  />
                ))
            ) : (
              <BodyText text={`No ${active} available.`} />
            )}
          </div>
          {data[active].length > 10 && (
            <div className='buttons'>
              <Link to={`/movies/${id}/images`} className='btn btn--tertiary'>
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
