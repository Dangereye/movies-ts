import { useContext } from 'react';

// Context
import { FiltersContext } from '../../contexts/FiltersContext';

type ToggleProps = {
  id: number;
  name: string;
  onClick: () => void;
};

export default function Toggle({ id, name, onClick }: ToggleProps) {
  const { genres } = useContext(FiltersContext);
  return (
    <button
      className={
        genres.includes(id) ? 'btn btn--toggle active' : 'btn btn--toggle'
      }
      onClick={onClick}
    >
      {name}
    </button>
  );
}
