import { useState } from 'react';

type ToggleProps = {
  name: string;
  func: () => void;
};

export default function Toggle({ name, func }: ToggleProps) {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
    func();
  };

  return (
    <button
      className={active ? 'btn btn--toggle active' : 'btn btn--toggle'}
      onClick={handleClick}
    >
      {name}
    </button>
  );
}
