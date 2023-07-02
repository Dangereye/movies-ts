// Icons
import { HiChevronDown } from 'react-icons/hi';

type CustomSelectInputProps = {
  selected: string | undefined;
  expanded: boolean;
  dispatch: () => void;
  children: React.ReactNode;
};

export default function CustomSelectInput({
  selected,
  expanded,
  dispatch,
  children,
}: CustomSelectInputProps) {
  return (
    <>
      <div
        className={expanded ? 'custom-select active' : 'custom-select'}
        onClick={dispatch}
      >
        <span className='custom-select__name'>{selected}</span>
        <span className='custom-select__icon'>{<HiChevronDown />}</span>
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
