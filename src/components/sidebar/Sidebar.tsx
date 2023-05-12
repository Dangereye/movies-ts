import { useContext } from 'react';

// Context
import { FiltersContext } from '../../contexts/FiltersContext';

// Hooks
import useCreateMovieGenres from '../../hooks/useCreateMovieGenres';

// Components
import Section from './sections/Section';
import ToggleButton from '../buttons/ToggleButton';

export default function Sidebar() {
  const {
    sort,
    setSort,
    adult,
    setAdult,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    genres,
    setGenres,
    types,
    setTypes,
  } = useContext(FiltersContext);

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
  const updateTypes = (id: number) => {
    if (types.includes(id)) {
      setTypes(types.filter((t) => t !== id));
    } else {
      setTypes([...types, id]);
    }
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
  };

  const handleAdult = (e: React.MouseEvent<HTMLDivElement>) => {
    setAdult(!adult);
  };

  return (
    <aside className='sidebar'>
      <div className='sidebar__content'>
        <Section heading='Sort'>
          <form className='form'>
            <select
              className='select-menu'
              name='sort-order'
              value={sort}
              onChange={handleSort}
            >
              <option className='select-menu__option' value='popularity.desc'>
                Popularity descending
              </option>
              <option className='select-menu__option' value='popularity.asc'>
                Popularity ascending
              </option>
              <option className='select-menu__option' value='vote_average.desc'>
                Rating descending
              </option>
              <option className='select-menu__option' value='vote_average.asc'>
                Rating ascending
              </option>
              <option
                className='select-menu__option'
                value='primary_release_date.desc'
              >
                Release date descending
              </option>
              <option
                className='select-menu__option'
                value='primary_release_date.asc'
              >
                Release date ascending
              </option>
              <option
                className='select-menu__option'
                value='original_title.asc'
              >
                Title (A-Z)
              </option>
              <option
                className='select-menu__option'
                value='original_title.desc'
              >
                Title (Z-A)
              </option>
            </select>
          </form>
        </Section>
        <Section heading='Genres'>
          <div className='buttons'>
            {movieGenres.map((genre) => (
              <ToggleButton
                key={genre.id}
                active={genres.includes(genre.id)}
                name={genre.name}
                onClick={() => updateGenres(genre.id)}
              />
            ))}
          </div>
        </Section>
        <Section heading='release dates'>
          <div className='buttons'>
            <ToggleButton
              key='premiere-release'
              active={types.includes(1)}
              name='Premiere'
              onClick={() => updateTypes(1)}
            />
            <ToggleButton
              key='theatrical-limited-release'
              active={types.includes(2)}
              name='Theatrical (limited)'
              onClick={() => updateTypes(2)}
            />
            <ToggleButton
              key='theatrical-release'
              active={types.includes(3)}
              name='Theatrical'
              onClick={() => updateTypes(3)}
            />
            <ToggleButton
              key='digital-release'
              active={types.includes(4)}
              name='Digital'
              onClick={() => updateTypes(4)}
            />
            <ToggleButton
              key='physical-release'
              active={types.includes(5)}
              name='Physical'
              onClick={() => updateTypes(5)}
            />
            <ToggleButton
              key='tv-release'
              active={types.includes(6)}
              name='TV'
              onClick={() => updateTypes(6)}
            />
          </div>
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
        <Section heading='Adult content'>
          <div className='buttons'>
            <ToggleButton
              active={adult}
              name={adult ? 'Visible' : 'Hidden'}
              onClick={handleAdult}
            />
          </div>
        </Section>
      </div>
    </aside>
  );
}
