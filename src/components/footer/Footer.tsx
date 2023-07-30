import { Link } from 'react-router-dom';
import Container from '../container/Container';
import Logo from '../svg/Logo';
import BodyText from '../typography/BodyText';
import HDiv from '../typography/HDiv';
import SmallText from '../typography/SmallText';
import { moviePages } from '../../data/moviePages';
import FooterList from './FooterList';
import { tvPages } from '../../data/tvPages';
import { peoplePages } from '../../data/peoplePages';

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

          <FooterList heading='Movies' navigation={moviePages} />
          <FooterList heading='Tv Shows' navigation={tvPages} />
          <FooterList heading='People' navigation={peoplePages} />

          <div>
            <HDiv heading='API' variant='heading--h4' />
            <a
              target='_blank'
              href='https://developer.themoviedb.org/docs'
              rel='noopener noreferrer'
            >
              www.themoviedb.org
            </a>
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
