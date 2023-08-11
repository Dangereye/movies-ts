import { useState } from 'react';

type ImageComponentProps = {
  file_path:
    | 'https://image.tmdb.org/t/p/w500/'
    | 'https://image.tmdb.org/t/p/original/'
    | null;
  filename: string | null | undefined;
  fallback: string;
  alt: string | undefined;
  width: number;
  aspect_ratio: 'aspect-ratio-1-1' | 'aspect-ratio-2-3' | 'aspect-ratio-16-9';
};

export default function ImageComponent({
  file_path,
  filename,
  fallback,
  alt,
  width,
  aspect_ratio,
}: ImageComponentProps) {
  const [imageUrl, setImageUrl] = useState(
    filename ? `${file_path ? file_path : ''}${filename}` : fallback
  );

  const handleError = () => {
    setImageUrl(fallback);
  };

  return (
    <div className={`image-wrapper ${aspect_ratio}`}>
      <img
        src={imageUrl}
        alt={alt}
        className={`image-component ${aspect_ratio}`}
        width={`${width}px`}
        onError={handleError}
      />
    </div>
  );
}
