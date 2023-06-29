import { ReactNode } from 'react';
import BackgroundImage from '../background_image/BackgroundImage';
import Container from '../container/Container';
import ImageComponent from '../image/Image';
import H1 from '../typography/H1';

type HeaderProps = {
  variant: 'header__full' | 'header__min';
  bgImage?: string | null | undefined;
  image?: string | null | undefined;
  alt?: string | null | undefined;
  title: string | null | undefined;
  children?: ReactNode;
};

export default function Header({
  variant,
  bgImage,
  image,
  alt,
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
          <ImageComponent
            key={title}
            src={`https://image.tmdb.org/t/p/w500/${image}`}
            fallback='/images/error_500x750.webp'
            width={500}
            height={750}
            alt={alt ? alt : 'Product image'}
          />
        )}
        <div className='header__content'>
          <H1 heading={title} />
          {children && children}
        </div>
      </Container>
    </header>
  );
}
