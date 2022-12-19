type H4Props = {
  variant?: string;
  heading?: string;
};

export default function H4({ variant, heading = "Heading H4" }: H4Props) {
  return <h4 className={`heading heading--h4 ${variant}`}>{heading}</h4>;
}
