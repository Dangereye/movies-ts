import { ReactNode } from "react";

type HeaderProps = {
  variant?: string;
  children: ReactNode;
};

export default function Header({ variant = "", children }: HeaderProps) {
  return <header className={`header ${variant}`}>{children}</header>;
}
