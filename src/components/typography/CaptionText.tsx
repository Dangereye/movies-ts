type CaptionTextProps = {
  caption: string | null | undefined;
};

export default function CaptionText({ caption }: CaptionTextProps) {
  return <>{caption && <div className="caption-text">{caption}</div>}</>;
}
