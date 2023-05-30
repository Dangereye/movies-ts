import { useLocation } from 'react-router-dom';
import MovieSidebar from './MovieSidebar';
import TvSidebar from './TvSidebar';

export default function Sidebar() {
  const { pathname } = useLocation();

  if (pathname.includes('movie')) {
    return <MovieSidebar />;
  }
  return <TvSidebar />;
}
