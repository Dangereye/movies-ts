type CaptionTextProps = {
  caption: string | null | undefined;
};

export default function CaptionText({ caption }: CaptionTextProps) {
  if (caption) {
    return <div className="caption-text">{caption}</div>;
  }
  return null;
}
