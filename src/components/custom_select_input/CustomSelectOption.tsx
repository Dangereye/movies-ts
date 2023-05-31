type CustomSelectOptionProps = {
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  name: string;
  value: string | undefined;
  active: boolean;
};

export default function CustomSelectOption({
  onClick,
  name,
  value,
  active,
}: CustomSelectOptionProps) {
  return (
    <div
      className={
        active ? 'custom-select_option active' : 'custom-select_option'
      }
      onClick={onClick}
      data-value={value}
    >
      {name}
    </div>
  );
}
