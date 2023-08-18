type BackgroundImageProps = {
  backdrop_sizes?: 'w300' | 'w780' | 'w1280' | 'original';
  filename: string | null | undefined;
};

export default function BackgroundImage({
  backdrop_sizes = 'w780',
  filename,
}: BackgroundImageProps) {
  if (filename) {
    return (
      <div
        className='background-image'
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/${backdrop_sizes}/${filename})`,
        }}
      ></div>
    );
  }

  return null;
}
