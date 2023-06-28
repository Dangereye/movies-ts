import { useState, useEffect, useRef } from 'react';

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
  const hasChanged = useRef(false);

  const handleOnChange = (num: number) => {
    hasChanged.current = true;
    setState(num);
  };

  useEffect(() => {
    if (hasChanged.current) {
      const globalState = window.setTimeout(() => {
        if (state > max) {
          setState(max);
          return;
        }
        if (state < min) {
          setState(min);
          return;
        }
        func(state);
        hasChanged.current = false;
      }, 1000);

      return () => {
        window.clearTimeout(globalState);
      };
    } else {
      setState(init);
    }
  }, [state, max, min, func, init]);

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
