import { ReactNode } from "react";

type SocialIconProps = {
  anchor: string | null | undefined;
  icon: ReactNode;
};

export default function SocialIcon({ anchor, icon }: SocialIconProps) {
  return (
    <>
      {anchor && icon ? (
        <a
          className="social-icon"
          href={anchor}
          rel="noreferrer"
          target="_blank"
        >
          {icon}
        </a>
      ) : null}
    </>
  );
}
