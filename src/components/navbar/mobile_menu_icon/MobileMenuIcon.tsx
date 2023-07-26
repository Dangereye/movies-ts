import { useContext } from 'react';
import { AppContext } from '../../../contexts/AppContext';

export default function MobileMenuIcon() {
  const { state, dispatch } = useContext(AppContext);

  const toggle = () => {
    dispatch({
      type: 'UPDATE_APP',
      payload: {
        ...state,
        mobile_menu: { active: !state.mobile_menu.active },
        mobile_filters_menu: { active: false },
      },
    });
  };

  return (
    <div
      className={
        state.mobile_menu.active
          ? 'mobile-menu-icon active'
          : 'mobile-menu-icon'
      }
      onClick={toggle}
    >
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
