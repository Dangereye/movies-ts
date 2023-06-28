import { useLocation } from 'react-router-dom';
import MovieSidebar from './MovieSidebar';
import TvSidebar from './TvSidebar';
import SearchSidebar from './SearchSidebar';

export default function Sidebar() {
  const { pathname } = useLocation();

  if (pathname.includes('search')) {
    return <SearchSidebar />;
  }

  if (pathname.includes('movie')) {
    return <MovieSidebar />;
  }

  return <TvSidebar />;
}
