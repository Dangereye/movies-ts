// React
import { useContext } from 'react';

// Contexts
import { AppContext } from '../../../contexts/AppContext';

// Component
import Button from '../../buttons/Button';

export default function MobileSidebarFiltersButtons() {
  const { state, dispatch } = useContext(AppContext);

  const openFiltersMenu = () => {
    dispatch({
      type: 'UPDATE_APP',
      payload: {
        ...state,
        mobile_filters_menu: { active: true },
        mobile_menu: { active: false },
      },
    });
  };

  return (
    <div className='mobile-sidebar-filters-buttons'>
      <Button
        name='filter results'
        variant='btn--secondary'
        onClick={openFiltersMenu}
      />
    </div>
  );
}
