import { useState, ReactNode } from 'react';
import { HiChevronDown } from 'react-icons/hi';

type CustomSelectInputProps = {
  selected: string | undefined;
  children: ReactNode;
};

export default function CustomSelectInput({
  selected,
  children,
}: CustomSelectInputProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className='custom-select' onClick={handleToggle}>
        <span>{selected}</span>
        <span>
          <HiChevronDown />
        </span>
      </div>
      <div
        className={
          isOpen ? 'custom-select_options active' : 'custom-select_options'
        }
      >
        {children}
      </div>
    </>
  );
}
