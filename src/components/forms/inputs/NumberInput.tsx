type NumberInputProps = {
  id: string;
  min: number;
  max: number;
  value: number;
  onChange: React.Dispatch<React.SetStateAction<number>>;
  onBlur: () => void;
};

export default function NumberInput({
  id,
  min,
  max,
  value,
  onChange,
  onBlur,
}: NumberInputProps) {
  const handleOnChange = (num: number) => {
    if (num < min) num = min;
    if (num > max) num = max;
    onChange(num);
  };

  return (
    <input
      id={id}
      className='form__input fixed-size'
      type='number'
      min={min}
      max={max}
      value={value}
      onChange={(e) => handleOnChange(+e.target.value)}
      onBlur={onBlur}
    />
  );
}
