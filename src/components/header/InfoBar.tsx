import { ReactNode } from "react";

type InfoBarProps = {
  children: ReactNode;
};

export default function InfoBar({ children }: InfoBarProps) {
  return <div className="info-bar">{children}</div>;
}
