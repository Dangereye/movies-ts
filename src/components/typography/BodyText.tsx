type BodyTextProps = {
  variant?: string;
  text?: string | null | undefined;
};

export default function BodyText({
  variant,
  text = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab nostrum repudiandae adipisci eveniet at placeat?",
}: BodyTextProps) {
  return <p className={`body-text ${variant}`}>{text}</p>;
}
