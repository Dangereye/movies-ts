import Container from '../../container/Container';
import { IoSettingsSharp } from 'react-icons/io5';
import BodyText from '../../typography/BodyText';

export default function MobileSidebarControls() {
  return (
    <div className='mobile-sidebar-controls'>
      <Container>
        <div className='mobile-sidebar-controls__settings'>
          <IoSettingsSharp />
          <BodyText text='Filters' />
        </div>
      </Container>
    </div>
  );
}
