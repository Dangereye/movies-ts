import { ReactNode } from "react";

type SocialIconProps = {
  anchor: string | null | undefined;
  icon: ReactNode;
};

export default function SocialIcon({ anchor, icon }: SocialIconProps) {
  if (anchor && icon) {
    return (
      <a className="social-icon" href={anchor} rel="noreferrer" target="_blank">
        {icon}
      </a>
    );
  }
  return null;
}
