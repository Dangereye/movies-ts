type H3Props = {
  variant?: string;
  heading: string;
};

export default function H3({ variant = "", heading }: H3Props) {
  if (heading) {
    return <h3 className={`heading heading--h3 ${variant}`}>{heading}</h3>;
  }
  return null;
}
