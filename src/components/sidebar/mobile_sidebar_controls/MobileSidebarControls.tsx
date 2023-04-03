import Container from '../../container/Container';
import { VscSettings } from 'react-icons/vsc';
import BodyText from '../../typography/BodyText';

export default function MobileSidebarControls() {
  return (
    <div className='mobile-sidebar-controls'>
      <Container>
        <div className='mobile-sidebar-controls__settings'>
          <VscSettings />
          <BodyText text='Settings' />
        </div>
      </Container>
    </div>
  );
}
