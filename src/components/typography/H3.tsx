type H3Props = {
  variant?: string;
  heading?: string;
};

export default function H3({ variant, heading = "Heading H3" }: H3Props) {
  return <h3 className={`heading heading--h3 ${variant}`}>{heading}</h3>;
}
