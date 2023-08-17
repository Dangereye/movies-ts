import { useState } from 'react';

type ImageComponentProps = {
  base_url?: 'https://image.tmdb.org/t/p/' | '';
  poster_sizes?: 'w92' | 'w154' | 'w185' | 'w300' | 'w500' | 'original' | '';
  profile_sizes?: 'w45' | 'w185' | 'h632' | 'original' | '';
  still_sizes?: 'w92' | 'w185' | 'w300' | 'original' | '';
  filename: string | null | undefined;
  fallback: string;
  alt: string | undefined;
  width: number;
  aspect_ratio: 'aspect-ratio-1-1' | 'aspect-ratio-2-3' | 'aspect-ratio-16-9';
  loading?: 'lazy' | undefined;
};

export default function ImageComponent({
  base_url = '',
  poster_sizes = '',
  profile_sizes = '',
  still_sizes = '',
  filename,
  fallback,
  alt,
  width,
  aspect_ratio,
  loading,
}: ImageComponentProps) {
  const [imageUrl, setImageUrl] = useState(
    filename
      ? `${base_url}${poster_sizes}${profile_sizes}${still_sizes}${filename}`
      : fallback
  );

  const handleError = () => {
    setImageUrl(fallback);
  };

  return (
    <div className={`image-wrapper ${aspect_ratio}`}>
      <img
        src={imageUrl}
        alt={alt}
        className='image-component'
        width={`${width}px`}
        onError={handleError}
        loading={loading}
      />
    </div>
  );
}
