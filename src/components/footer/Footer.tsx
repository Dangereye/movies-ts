import { Link } from 'react-router-dom';
import Container from '../container/Container';
import Logo from '../svg/Logo';
import BodyText from '../typography/BodyText';
import HDiv from '../typography/HDiv';
import SmallText from '../typography/SmallText';

export default function Footer() {
  return (
    <footer className='footer'>
      <Container>
        <div className='footer__columns'>
          <div>
            <div className='logo__wrapper'>
              <Logo />
              <HDiv heading='Movies' variant='heading--h2' />
            </div>
            <BodyText text='Millions of movies, Tv shows and people to discover, explore now.' />
          </div>

          <div>
            <HDiv heading='Movies' variant='heading--h3' />
            <Link to='/'>Popular</Link>
            <Link to='/'>Theatrical releases</Link>
            <Link to='/'>Upcoming releases</Link>
            <Link to='/'>Top rated</Link>
          </div>
          <div>
            <HDiv heading='Tv Shows' variant='heading--h3' />
            <Link to='/'>Popular</Link>
            <Link to='/'>Airing today</Link>
            <Link to='/'>Next seven days</Link>
            <Link to='/'>Top rated</Link>
          </div>
          <div>
            <HDiv heading='People' variant='heading--h3' />
            <Link to='/'>Popular</Link>
          </div>
          <div>
            <HDiv heading='API' variant='heading--h3' />
            <Link to='/'>www.themoviedb.org</Link>
          </div>
        </div>
        <div className='footer__copyright'>
          <SmallText text='Copyright © 2023, Craig Puxty.' />
          <SmallText text='All rights reserved.' />
        </div>
      </Container>
    </footer>
  );
}
