// React
import { ReactElement } from 'react';

// Components
import BodyText from './BodyText';

type IconTextProps = {
  name: string;
  icon: ReactElement;
  text: string | null | undefined;
};
export default function IconText({ name, icon, text }: IconTextProps) {
  if (text) {
    return (
      <div className={`icon-text icon-text-${name}`}>
        <div className='icon-text__icon'>{icon}</div>
        <BodyText text={text} />
      </div>
    );
  }
  return null;
}
