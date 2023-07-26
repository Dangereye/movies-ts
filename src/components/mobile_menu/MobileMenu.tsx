import { useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';
import { moviePages } from '../../data/moviePages';
import { tvPages } from '../../data/tvPages';
import { peoplePages } from '../../data/peoplePages';
import MobileMenuGroup from './mobile_menu_group/MobileMenuGroup';

export default function MobileMenu() {
  const { state, dispatch } = useContext(AppContext);

  const closeMenu = () => {
    dispatch({
      type: 'UPDATE_APP',
      payload: { ...state, mobile_menu: { active: false } },
    });
  };

  return (
    <div
      className={
        state.mobile_menu.active ? 'mobile-menu active' : 'mobile-menu'
      }
    >
      <div className='mobile-menu__content'>
        <MobileMenuGroup
          heading='Movies'
          heading_href='/movies/popular'
          navigation_data={moviePages}
          onClick={closeMenu}
        />
        <MobileMenuGroup
          heading='Tv Shows'
          heading_href='/tv/popular'
          navigation_data={tvPages}
          onClick={closeMenu}
        />
        <MobileMenuGroup
          heading='People'
          heading_href='/people/popular'
          navigation_data={peoplePages}
          onClick={closeMenu}
        />
      </div>
    </div>
  );
}
