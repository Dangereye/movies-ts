import { Link } from 'react-router-dom';
import Navigation from '../../navigation/Navigation';

type MobilemenuGroupProps = {
  heading_href: string;
  heading: string;
  navigation_data: {
    name: string;
    link: string;
  }[];
  onClick: () => void;
};

export default function MobileMenuGroup({
  heading_href,
  heading,
  navigation_data,
  onClick,
}: MobilemenuGroupProps) {
  return (
    <div className='mobile-menu__group'>
      <Link to={heading_href} className='heading heading--h4' onClick={onClick}>
        {heading}
      </Link>
      <Navigation
        data={navigation_data}
        getId={(item) => item.name}
        getLink={(item) => item.link}
        renderItem={(item) => item.name}
        variant='vertical'
        onClick={onClick}
      />
    </div>
  );
}
