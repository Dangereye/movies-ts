import Container from '../container/Container';
import BodyText from '../typography/BodyText';

export default function Footer() {
  return (
    <footer className='footer'>
      <Container>
        <BodyText text='Copyright © 2023, Craig Puxty. All rights reserved.' />
      </Container>
    </footer>
  );
}
