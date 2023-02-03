import { ReactNode } from "react";

type WrapperProps = {
  name: string;
  variant?: "block" | "flex" | "grid" | "scroll";
  children: ReactNode;
};

export default function Wrapper({
  name,
  variant = "block",
  children,
}: WrapperProps) {
  return <div className={`wrapper ${name} ${variant}`}>{children}</div>;
}
