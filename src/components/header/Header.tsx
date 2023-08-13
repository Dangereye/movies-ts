import { ReactNode } from 'react';
import BackgroundImage from '../background_image/BackgroundImage';
import Container from '../container/Container';
import ImageComponent from '../image/Image';
import H1 from '../typography/H1';
import HDiv from '../typography/HDiv';

type HeaderProps = {
  variant: 'header__full' | 'header__min' | 'header__center';
  bgImage?: string | null | undefined;
  image?: string | null | undefined;
  alt?: string | undefined;
  leadTitle?: string | undefined;
  title: string | undefined;
  children?: ReactNode;
};

export default function Header({
  variant,
  bgImage,
  image,
  alt,
  leadTitle,
  title,
  children,
}: HeaderProps) {
  return (
    <header className={`header ${variant}`}>
      {bgImage && (
        <BackgroundImage
          path={`https://image.tmdb.org/t/p/original/${bgImage}`}
        />
      )}
      <Container>
        {variant === 'header__full' && (
          <div className='header__image'>
            <ImageComponent
              key={title}
              file_path='https://image.tmdb.org/t/p/w500/'
              filename={image}
              fallback='/images/error_500x750.webp'
              width={500}
              aspect_ratio='aspect-ratio-2-3'
              alt={alt ? alt : 'Product image'}
            />
          </div>
        )}
        <div className='header__content'>
          <div>
            {leadTitle && <HDiv variant='heading--lead' heading={leadTitle} />}
            <H1 heading={title} />
          </div>
          {children && children}
        </div>
      </Container>
    </header>
  );
}
