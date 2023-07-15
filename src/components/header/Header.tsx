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
  alt?: string | null | undefined;
  leadTitle?: string;
  title: string | null | undefined;
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
