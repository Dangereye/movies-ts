import { useState } from 'react';

type ImageComponentProps = {
  src: string;
  fallback: string;
  alt: string | undefined;
  width?: number;
  height?: number;
};

export default function ImageComponent({
  src,
  fallback,
  alt = 'Image text',
  width = 300,
  height,
}: ImageComponentProps) {
  const [path, setPath] = useState(src);

  const handleError = () => {
    setPath(fallback);
  };

  return (
    <img
      src={path}
      alt={alt}
      className='image-component'
      width={`${width}px`}
      height={height ? `${height}px` : 'auto'}
      onError={handleError}
    />
  );
}
