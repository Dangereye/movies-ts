import { useState, useEffect } from 'react';

type NumberInputProps = {
  init: number;
  id: string;
  min: number;
  max: number;
  func: (value: number) => void;
};

export default function NumberInput({
  init,
  id,
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
      id={id}
      className='form__input fixed-size'
      type='number'
      min={min}
      max={max}
      value={state}
      onChange={(e) => handleOnChange(+e.target.value)}
    />
  );
}
