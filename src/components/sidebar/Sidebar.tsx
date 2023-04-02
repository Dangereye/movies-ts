import useCreateMovieGenres from '../../hooks/useCreateMovieGenres';
import Navigation from '../navigation/Navigation';
import Section from './sections/Section';

export default function Sidebar() {
  const genres = useCreateMovieGenres();
  return (
    <aside className='sidebar'>
      <Section heading='Genres'>
        <Navigation
          variant='vertical'
          getId={(item) => item.id}
          getLink={(item) => `/genre/${item.id}/movie`}
          renderItem={(item) => item.name}
          data={genres}
        />
      </Section>
    </aside>
  );
}
