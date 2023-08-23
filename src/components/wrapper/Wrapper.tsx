type WrapperProps = {
  name: string;
  variant?: 'block' | 'flex' | 'grid' | 'scroll';
  children: React.ReactNode;
};

export default function Wrapper({
  name,
  variant = 'block',
  children,
}: WrapperProps) {
  return <div className={`wrapper ${name} ${variant}`}>{children}</div>;
}
