type H1Props = {
  variant?: string;
  heading: string | null | undefined;
};

export default function H1({ variant = "", heading }: H1Props) {
  if (heading) {
    return <h1 className={`heading heading--h1 ${variant}`}>{heading}</h1>;
  }
  return null;
}
