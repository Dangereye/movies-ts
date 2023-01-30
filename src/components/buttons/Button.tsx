import { ReactNode } from "react";

type ButtonProps = {
  active?: boolean;
  variant?: "btn--primary" | "btn--secondary" | "btn--tertiary" | "btn--close";
  name: string | ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function Button({
  active = false,
  variant = "btn--primary",
  name,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={`btn ${variant} ${active ? "active" : ""}`}
      onClick={onClick}
    >
      {name}
    </button>
  );
}
