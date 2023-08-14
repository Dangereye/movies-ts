import { ReactNode } from 'react';

type SocialIconProps = {
  anchor: string | null | undefined;
  ariaLabel: string;
  icon: ReactNode;
};

export default function SocialIcon({
  anchor,
  ariaLabel,
  icon,
}: SocialIconProps) {
  if (anchor) {
    return (
      <a
        className='social-icon'
        aria-label={ariaLabel}
        href={anchor}
        rel='noreferrer'
        target='_blank'
      >
        {icon}
      </a>
    );
  }
  return null;
}
