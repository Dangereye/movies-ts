import { ReactNode } from 'react';

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  active?: boolean;
  variant?: 'btn--primary' | 'btn--secondary' | 'btn--tertiary' | 'btn--close';
  name: string | ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
};

export default function Button({
  active = false,
  variant = 'btn--primary',
  name,
  onClick,
  type = 'button',
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`btn ${variant} ${active ? 'active' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {name}
    </button>
  );
}
