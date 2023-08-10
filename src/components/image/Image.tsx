import { useState } from 'react';

type ImageComponentProps = {
  src: string;
  fallback: string;
  alt: string | undefined;
  width?: number;
  height?: number;
  aspectRatio?: 'aspect-ratio-2-3' | 'aspect-ratio-16-9';
};

export default function ImageComponent({
  src,
  fallback,
  alt = 'Image text',
  width = 300,
  height,
  aspectRatio = 'aspect-ratio-2-3',
}: ImageComponentProps) {
  const [path, setPath] = useState(src);

  const handleError = () => {
    setPath(fallback);
  };

  return (
    <img
      src={path}
      alt={alt}
      className={`image-component ${aspectRatio}`}
      width={`${width}px`}
      height={height ? `${height}px` : 'auto'}
      onError={handleError}
    />
  );
}
