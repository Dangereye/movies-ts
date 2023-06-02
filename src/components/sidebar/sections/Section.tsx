import { ReactNode } from 'react';
import Button from '../../buttons/Button';
import HDiv from '../../typography/HDiv';
import { HiChevronDown } from 'react-icons/hi';
import Wrapper from '../../wrapper/Wrapper';

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
    <div className={expanded ? 'sidebar__section active' : 'sidebar__section'}>
      <Wrapper name='section-header' variant='flex'>
        <HDiv variant='heading--h4' heading={heading} />
        <Button
          variant='btn--close'
          name={<HiChevronDown />}
          onClick={dispatch}
        />
      </Wrapper>
      {expanded && children}
    </div>
  );
}
