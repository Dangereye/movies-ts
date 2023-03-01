type BodyTextProps = {
  variant?: string;
  text: string | string[] | number | null | undefined;
};

export default function BodyText({ variant = "", text }: BodyTextProps) {
  if (text) {
    return <p className={`body-text ${variant}`}>{text}</p>;
  }
  return null;
}
