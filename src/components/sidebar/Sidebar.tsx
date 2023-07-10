// React router
import { useLocation } from 'react-router-dom';

// Components
import MovieSidebar from './MovieSidebar';
import TvSidebar from './TvSidebar';
import SearchSidebar from './SearchSidebar';
import HDiv from '../typography/HDiv';
import ImagesSidebar from './ImagesSidebar';

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <aside className='sidebar'>
      <div className='sidebar__content'>
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
    </aside>
  );
}
