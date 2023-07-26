import { useContext } from 'react';
import { AppContext } from '../../../contexts/AppContext';
import H2 from '../../typography/H2';

export default function MobileSidebarFiltersMenu() {
  const { state, dispatch } = useContext(AppContext);
  return (
    <div
      className={
        state.mobile_filters_menu.active
          ? 'mobile-sidebar-filters-menu active'
          : 'mobile-sidebar-filters-menu'
      }
    >
      <H2 heading='Filter results' />
    </div>
  );
}
