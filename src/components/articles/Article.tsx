import { ReactNode } from "react";

type ArticleProps = {
  name: string;
  variant?: string;
  children: ReactNode;
};

export default function Article({
  name,
  variant = "",
  children,
}: ArticleProps) {
  return <article className={`article ${name} ${variant}`}>{children}</article>;
}
