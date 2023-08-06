type SmallTextProps = {
  variant?: string;
  text: string | null | undefined;
};

export default function SmallText({ variant = '', text }: SmallTextProps) {
  if (text) {
    return <p className={`small-text ${variant}`}>{text}</p>;
  }
  return null;
}
