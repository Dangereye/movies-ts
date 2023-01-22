type H1Props = {
  variant?: string;
  heading?: string;
};

export default function H1({ variant = "", heading = "Heading H1" }: H1Props) {
  return <h1 className={`heading heading--h1 ${variant}`}>{heading}</h1>;
}
