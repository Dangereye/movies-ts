import useCreateMovieGenres from '../../hooks/useCreateMovieGenres';
import Navigation from '../navigation/Navigation';
import HDiv from '../typography/HDiv';

export default function Sidebar() {
  const genres = useCreateMovieGenres();
  return (
    <aside className='sidebar'>
      <HDiv variant='heading--h4' heading='genres' />
      <Navigation
        variant='vertical'
        getId={(item) => item.id}
        getLink={(item) => `/genre/${item.id}/movie`}
        renderItem={(item) => item.name}
        data={genres}
      />
    </aside>
  );
}
