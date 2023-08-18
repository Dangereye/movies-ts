import ImageComponent from '../../image/Image';

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
    <div
      className={active ? 'providers__icon active' : 'providers__icon'}
      onClick={onClick}
      data-tool-tip={name}
    >
      <div className='providers__status'>{<TiTick />}</div>
      <ImageComponent
        base_url='https://image.tmdb.org/t/p/'
        filename={logo}
        logo_sizes='w92'
        fallback=''
        width={55}
        aspect_ratio='aspect-ratio-1-1'
        alt={name}
        loading='lazy'
      />
    </div>
  );
}
