import { Link } from 'react-router-dom';
import { pages } from '../../data/pages';
import Container from '../container/Container';
import MobileMenuIcon from '../mobile_menu_icon/MobileMenuIcon';
import Navigation from '../navigation/Navigation';
import Searchbar from './searchbar/Searcbar';

export default function Navbar() {
  return (
    <div className='navbar'>
      <Container>
        <Link to='/' className='navbar__logo'>
          Movies
        </Link>
        <Searchbar />
        <Navigation
          data={pages}
          getId={(item) => item.name}
          getLink={(item) => item.link}
          renderItem={(item) => <>{item.name}</>}
          variant='horizontal'
        />
        <MobileMenuIcon />
      </Container>
    </div>
  );
}
