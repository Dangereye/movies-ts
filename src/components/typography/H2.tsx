type H2Props = {
  variant?: string;
  heading?: string;
};

export default function H2({ variant = "", heading = "Heading H2" }: H2Props) {
  return <h2 className={`heading heading--h2 ${variant}`}>{heading}</h2>;
}
