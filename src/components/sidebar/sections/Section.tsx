// React
import { ReactNode } from 'react';

// Components
import Button from '../../buttons/Button';
import HDiv from '../../typography/HDiv';

// Icons
import { HiChevronDown } from 'react-icons/hi';

type SectionProps = {
  expanded: boolean;
  dispatch: () => void;
  heading: string;
  children: ReactNode;
};

export default function Section({
  expanded,
  dispatch,
  heading,
  children,
}: SectionProps) {
  return (
    <div className={expanded ? 'section active' : 'section'}>
      <div className='section__heading'>
        <HDiv variant='heading--h5' heading={heading} />
        <Button
          variant='btn--close'
          name={<HiChevronDown />}
          onClick={dispatch}
        />
      </div>
      <div
        className={expanded ? 'section__content active' : 'section__content'}
      >
        {children}
      </div>
    </div>
  );
}
