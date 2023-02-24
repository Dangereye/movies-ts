type H4Props = {
  variant?: string;
  heading: string;
};

export default function H4({ variant = "", heading }: H4Props) {
  if (heading) {
    return <h4 className={`heading heading--h4 ${variant}`}>{heading}</h4>;
  }
  return null;
}
