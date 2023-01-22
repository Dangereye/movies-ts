import { ReactNode } from "react";

type ButtonProps = {
  variant?: "btn--primary" | "btn--secondary" | "btn--tertiary";
  name: string | ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function Button({
  variant = "btn--primary",
  name,
  onClick,
}: ButtonProps) {
  return (
    <button className={`btn ${variant}`} onClick={onClick}>
      {name}
    </button>
  );
}
