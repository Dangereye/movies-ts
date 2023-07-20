// React router
import { Link } from 'react-router-dom';

// Data
import { pages } from '../../data/pages';

// Components
import Container from '../container/Container';
import MobileMenuIcon from '../mobile_menu_icon/MobileMenuIcon';
import Navigation from '../navigation/Navigation';
import SearchIcon from './search_icon/SearchIcon';

export default function Navbar() {
  return (
    <div className='navbar'>
      <Container>
        <Link to='/' className='navbar__logo'>
          Movies
        </Link>
        <div className='controls'>
          <Navigation
            data={pages}
            getId={(item) => item.name}
            getLink={(item) => item.link}
            renderItem={(item) => <>{item.name}</>}
            variant='horizontal'
          />
          <MobileMenuIcon />
          <SearchIcon />
        </div>
      </Container>
    </div>
  );
}
