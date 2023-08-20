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

export default function SidebarSection({
  expanded,
  dispatch,
  heading,
  children,
}: SectionProps) {
  return (
    <div className={expanded ? 'sidebar-section active' : 'sidebar-section'}>
      <div className='sidebar-section__heading'>
        <HDiv variant='heading--h5' heading={heading} />
        <Button
          variant='btn--close'
          name={<HiChevronDown />}
          onClick={dispatch}
          ariaLabel={`Toggle ${heading}`}
        />
      </div>
      <div
        className={
          expanded
            ? 'sidebar-section__content active'
            : 'sidebar-section__content'
        }
      >
        {children}
      </div>
    </div>
  );
}
