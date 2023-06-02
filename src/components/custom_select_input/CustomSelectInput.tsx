import { ReactNode } from 'react';
import { HiChevronDown } from 'react-icons/hi';

type CustomSelectInputProps = {
  selected: string | undefined;
  expanded: boolean;
  dispatch: () => void;
  children: ReactNode;
};

export default function CustomSelectInput({
  selected,
  expanded,
  dispatch,
  children,
}: CustomSelectInputProps) {
  return (
    <>
      <div className='custom-select' onClick={dispatch}>
        <span>{selected}</span>
        <span>{<HiChevronDown />}</span>
      </div>
      <div
        className={
          expanded ? 'custom-select_options active' : 'custom-select_options'
        }
      >
        {children}
      </div>
    </>
  );
}
