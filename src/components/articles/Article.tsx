import { ReactNode } from 'react';

type ArticleProps = {
  name: string;
  padding?: boolean;
  variant?: string;
  children: ReactNode;
};

export default function Article({
  name,
  padding = false,
  variant = '',
  children,
}: ArticleProps) {
  return (
    <article
      className={`article ${
        padding && 'horizontal-padding'
      } ${name} ${variant}`}
    >
      {children}
    </article>
  );
}
