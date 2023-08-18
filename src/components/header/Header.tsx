// Components
import BackgroundImage from '../background_image/BackgroundImage';
import Container from '../container/Container';
import ImageComponent from '../image/Image';
import H1 from '../typography/H1';
import HDiv from '../typography/HDiv';

type HeaderProps = {
  variant: 'header__full' | 'header__min' | 'header__center';
  bgImage?: string | null | undefined;
  backdrop_sizes?: 'w300' | 'w780' | 'w1280' | 'original';
  image?: string | null | undefined;
  poster_sizes?: 'w92' | 'w154' | 'w185' | 'w300' | 'w500' | 'original' | '';
  profile_sizes?: 'w45' | 'w185' | 'h632' | 'original' | '';
  alt?: string | undefined;
  leadTitle?: string | undefined;
  title: string | undefined;
  children?: React.ReactNode;
};

export default function Header({
  variant,
  bgImage,
  backdrop_sizes,
  image,
  poster_sizes = '',
  profile_sizes = '',
  alt,
  leadTitle,
  title,
  children,
}: HeaderProps) {
  return (
    <header className={`header ${variant}`}>
      <BackgroundImage backdrop_sizes={backdrop_sizes} filename={bgImage} />
      <Container>
        {variant === 'header__full' && (
          <div className='header__image'>
            <ImageComponent
              key={title}
              filename={image}
              poster_sizes={poster_sizes}
              profile_sizes={profile_sizes}
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
