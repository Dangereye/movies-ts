import { ReactNode } from "react";

type ArticleProps = {
  variant?: string;
  children: ReactNode;
};

export default function Article({ variant = "", children }: ArticleProps) {
  return <article className={`article ${variant}`}>{children}</article>;
}
