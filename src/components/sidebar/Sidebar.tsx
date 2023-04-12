import { useContext } from 'react';
import Section from './sections/Section';
import { FiltersContext } from '../../contexts/FiltersContext';
import useCreateMovieGenres from '../../hooks/useCreateMovieGenres';
import SidebarToggle from './SidebarToggle';

export default function Sidebar() {
  const { dateFrom, setDateFrom, dateTo, setDateTo, genres, setGenres } =
    useContext(FiltersContext);

  const movieGenres = useCreateMovieGenres();

  const handleDateFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateFrom(e.target.value);
  };

  const handleDateTo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateTo(e.target.value);
  };

  const updateGenres = (id: number) => {
    if (genres.includes(id)) {
      setGenres(genres.filter((g) => g !== id));
    } else {
      setGenres([...genres, id]);
    }
  };

  return (
    <aside className='sidebar'>
      <div className='sidebar__content'>
        <Section heading='Genres'>
          <div className='sidebar-toggles'>
            {movieGenres.map((genre) => (
              <SidebarToggle
                key={genre.id}
                id={genre.id}
                name={genre.name}
                onClick={() => updateGenres(genre.id)}
              />
            ))}
          </div>
        </Section>
        <Section heading='release dates'>
          <form className='form'>
            <div className='form__group'>
              <label htmlFor='date-from'>From</label>
              <input
                type='date'
                name='date-from'
                value={dateFrom}
                onChange={handleDateFrom}
              />
            </div>
            <div className='form__group'>
              <label htmlFor='date-to'>To</label>
              <input
                type='date'
                name='date-to'
                value={dateTo}
                onChange={handleDateTo}
              />
            </div>
          </form>
        </Section>
      </div>
    </aside>
  );
}
