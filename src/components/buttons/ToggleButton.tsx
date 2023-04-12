type ToggleButtonProps = {
  active: boolean;
  name: string;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
};

export default function ToggleButton({
  active,
  name,
  onClick,
}: ToggleButtonProps) {
  return (
    <div className='btn btn__toggle-group'>
      <span className='name'>{name}</span>
      <div
        className={active ? 'btn__toggle active' : 'btn__toggle'}
        onClick={onClick}
      >
        <div className='switch'></div>
      </div>
    </div>
  );
}
