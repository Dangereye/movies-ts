import ImageComponent from '../image/Image';

import { TiTick } from 'react-icons/ti';

type ProvidersIconProps = {
  id: number;
  active: boolean;
  name: string;
  logo: string;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
};

export default function ProvidersIcon({
  id,
  active,
  name,
  logo,
  onClick,
}: ProvidersIconProps) {
  return (
    <div className='providers__icon' onClick={onClick}>
      <div
        className={active ? 'providers__status active' : 'providers__status'}
      >
        <TiTick />
      </div>
      <ImageComponent
        src={`https://image.tmdb.org/t/p/w500/${logo}`}
        fallback=''
        alt={name}
      />
    </div>
  );
}
