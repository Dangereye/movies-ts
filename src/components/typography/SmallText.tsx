type SmallTextProps = {
  variant?: string;
  text?: string | null | undefined;
};

export default function SmallText({
  variant = "",
  text = "Lorem ipsum dolor sit.",
}: SmallTextProps) {
  return <p className={`small-text ${variant}`}>{text}</p>;
}
