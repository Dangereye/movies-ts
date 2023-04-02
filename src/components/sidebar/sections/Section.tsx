import { ReactNode, useState } from 'react';
import Button from '../../buttons/Button';
import HDiv from '../../typography/HDiv';
import { HiChevronDown } from 'react-icons/hi';
import Wrapper from '../../wrapper/Wrapper';

type SectionProps = {
  heading: string;
  children: ReactNode;
};

export default function Section({ heading, children }: SectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={isOpen ? 'sidebar__section active' : 'sidebar__section'}>
      <Wrapper name='section-header' variant='flex'>
        <HDiv variant='heading--h4' heading={heading} />
        <Button
          variant='btn--close'
          name={<HiChevronDown />}
          onClick={toggle}
        />
      </Wrapper>
      {isOpen && children}
    </div>
  );
}
