import { useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';
import H2 from '../typography/H2';

export default function MobileMenu() {
  const { state, dispatch } = useContext(AppContext);
  return (
    <div
      className={
        state.mobile_menu.active ? 'mobile-menu active' : 'mobile-menu'
      }
    >
      <H2 heading='Mobile menu' />
    </div>
  );
}
