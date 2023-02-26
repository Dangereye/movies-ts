import { useState } from "react";
import Button from "../buttons/Button";

type ExpandableTextProps = {
  text: string | undefined;
  lines: number;
};

export default function ExpandableText({ text, lines }: ExpandableTextProps) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  if (text) {
    return (
      <>
        <p
          className={expanded ? "expandable-text active" : "expandable-text"}
          style={{ WebkitLineClamp: lines, lineClamp: lines }}
        >
          {text}
        </p>
        {text !== "Unavailable" && (
          <Button
            name={expanded ? "Read Less" : "Read More"}
            variant={"btn--tertiary"}
            onClick={toggleExpanded}
          />
        )}
      </>
    );
  }
  return null;
}
