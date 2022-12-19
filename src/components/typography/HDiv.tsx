type HDivProps = {
  variant: "heading--h1" | "heading--h2" | "heading--h3" | "heading--h4";
  heading?: string;
};

export default function HDiv({ variant, heading = "Heading HDiv" }: HDivProps) {
  return <div className={`heading ${variant}`}>{heading}</div>;
}
