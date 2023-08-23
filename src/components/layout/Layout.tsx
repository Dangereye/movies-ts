// React
import { ReactNode } from 'react';

type LayoutProps = {
  variant?: 'grid grid--sidebar';
  children: ReactNode;
};

export default function Layout({ variant, children }: LayoutProps) {
  return <div className={`layout ${variant}`}>{children}</div>;
}
