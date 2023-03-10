import { useState, useEffect, useRef } from "react";
import Button from "../buttons/Button";

type ExpandableTextProps = {
  text: string | undefined;
  lines: number;
};

export default function ExpandableText({ text, lines }: ExpandableTextProps) {
  const [expanded, setExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const element = useRef<HTMLParagraphElement | null>(null);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    if (
      element.current &&
      element.current?.clientHeight < element.current?.scrollHeight
    ) {
      setShowButton(true);
    }
  }, [element]);

  if (text) {
    return (
      <>
        <p
          ref={element}
          className={expanded ? "expandable-text active" : "expandable-text"}
          style={{ WebkitLineClamp: lines, lineClamp: lines }}
        >
          {text}
        </p>
        {showButton && (
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
