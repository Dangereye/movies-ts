import { ReactNode } from "react";

type ContainerProps = {
  variant?: string;
  children: ReactNode;
};

export default function Container({ variant = "", children }: ContainerProps) {
  return <div className={`container ${variant}`}>{children}</div>;
}
