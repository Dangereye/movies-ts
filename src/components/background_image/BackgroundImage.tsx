type BackgroundImageProps = { path: string };

export default function BackgroundImage({ path }: BackgroundImageProps) {
  return (
    <>
      {path && (
        <div
          className="background-image"
          style={{
            backgroundImage: `url(${path})`,
          }}
        ></div>
      )}
    </>
  );
}
