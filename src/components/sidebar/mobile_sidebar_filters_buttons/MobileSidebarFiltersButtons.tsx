import { useContext } from 'react';
import { AppContext } from '../../../contexts/AppContext';
import Button from '../../buttons/Button';

export default function MobileSidebarFiltersButtons() {
  const { state, dispatch } = useContext(AppContext);

  const openFiltersMenu = () => {
    dispatch({
      type: 'UPDATE_APP',
      payload: { ...state, mobile_filters_menu: { active: true } },
    });
  };

  return (
    <div className='mobile-sidebar-filters-buttons'>
      <Button
        name='filters'
        variant='btn--secondary'
        onClick={openFiltersMenu}
      />
    </div>
  );
}
