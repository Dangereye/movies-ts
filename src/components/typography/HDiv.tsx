type HDivProps = {
  variant: "heading--h1" | "heading--h2" | "heading--h3" | "heading--h4";
  heading: string | number;
};

export default function HDiv({ variant, heading }: HDivProps) {
  if (heading) {
    return <div className={`heading ${variant}`}>{heading}</div>;
  }
  return null;
}
