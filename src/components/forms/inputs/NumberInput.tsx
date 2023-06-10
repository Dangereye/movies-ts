import { useState, useEffect } from 'react';

type NumberInputProps = {
  init: number;
  name: string;
  min: number;
  max: number;
  func: (value: number) => void;
};

export default function NumberInput({
  init,
  name,
  min,
  max,
  func,
}: NumberInputProps) {
  const [state, setState] = useState<number>(init);

  const handleOnChange = (num: number) => {
    setState(num);
  };

  useEffect(() => {
    const globalState = window.setTimeout(() => {
      if (state > max) {
        setState(max);
      }
      if (state < min) {
        setState(0);
      }
      func(state);
    }, 500);
    return () => {
      window.clearTimeout(globalState);
    };
  }, [state]);

  return (
    <input
      className='form__input fixed-size'
      type='number'
      name={name}
      min={min}
      max={max}
      value={state}
      onChange={(e) => handleOnChange(+e.target.value)}
    />
  );
}
