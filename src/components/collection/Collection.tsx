// Components
import { Link } from 'react-router-dom';
import BackgroundImage from '../background_image/BackgroundImage';
import Container from '../container/Container';
import HDiv from '../typography/HDiv';

type CollectionProps = {
  image: string | undefined;
  name: string | undefined;
  id: number | undefined;
};

export default function Collection({ image, name, id }: CollectionProps) {
  return (
    <>
      {image && name && id ? (
        <div className='collection'>
          <BackgroundImage filename={image} />
          <Container>
            <HDiv variant='heading--h2' heading={`Part of the ${name}`} />
            <Link className='btn btn--primary' to={`/collection/${id}`}>
              View Collection
            </Link>
          </Container>
        </div>
      ) : null}
    </>
  );
}
