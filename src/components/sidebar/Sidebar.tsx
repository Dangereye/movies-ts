// React
import { useContext } from 'react';

// React router
import { useLocation } from 'react-router-dom';

// Context
import { AppContext } from '../../contexts/AppContext';

// Components
import MovieSidebar from './MovieSidebar';
import TvSidebar from './TvSidebar';
import SearchSidebar from './SearchSidebar';
import HDiv from '../typography/HDiv';
import ImagesSidebar from './ImagesSidebar';
import Button from '../buttons/Button';

// Icons
import { CgClose } from 'react-icons/cg';

export default function Sidebar() {
  const { state, dispatch } = useContext(AppContext);
  const { pathname } = useLocation();

  const filterRoutes = [
    'movies/popular',
    'tv/popular',
    'theatrical-releases',
    'upcoming',
    'top-rated',
    'airing-today',
    'next-seven-days',
    'search',
    'images',
  ];

  const checkPathname = () => {
    let result = false;
    filterRoutes.forEach((item) => {
      if (pathname.includes(item)) {
        result = true;
      }
    });
    return result;
  };

  const closeMobileFiltersMenu = () => {
    dispatch({
      type: 'UPDATE_APP',
      payload: { ...state, mobile_filters_menu: { active: false } },
    });
  };

  if (checkPathname()) {
    return (
      <div
        className={
          state.mobile_filters_menu.active ? 'sidebar active' : 'sidebar'
        }
      >
        <div className='sidebar__content'>
          <Button
            name={<CgClose />}
            variant='btn--secondary'
            onClick={closeMobileFiltersMenu}
            ariaLabel='Close menu'
          />

          <HDiv variant='heading--h4' heading='Filter results' />
          {pathname.includes('search') && !pathname.includes('images') ? (
            <SearchSidebar />
          ) : pathname.includes('movie') && !pathname.includes('images') ? (
            <MovieSidebar />
          ) : pathname.includes('tv') && !pathname.includes('images') ? (
            <TvSidebar />
          ) : (
            <ImagesSidebar />
          )}
        </div>
      </div>
    );
  }

  return null;
}
