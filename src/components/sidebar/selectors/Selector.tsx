type SelectorProps = {
  active: boolean;
  name: string;
  value: number | undefined;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
};

export default function Selector({
  active,
  name,
  value,
  onClick,
}: SelectorProps) {
  return (
    <div className={active ? 'selector active' : 'selector'} onClick={onClick}>
      <div className='selector__name'>{name}</div>
      <div className='selector__results'>{value?.toLocaleString()}</div>
    </div>
  );
}
