type H2Props = {
  variant?: string;
  heading: string;
};

export default function H2({ variant = "", heading }: H2Props) {
  if (heading) {
    return <h2 className={`heading heading--h2 ${variant}`}>{heading}</h2>;
  }
  return null;
}
