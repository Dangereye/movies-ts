import { useContext } from 'react';

// Context
import { FiltersContext } from '../../contexts/FiltersContext';

// Hooks
import useCreateMovieGenres from '../../hooks/useCreateMovieGenres';

// Components
import Section from './sections/Section';
import ToggleButton from '../buttons/ToggleButton';

export default function Sidebar() {
  const { state, dispatch } = useContext(FiltersContext);

  const movieGenres = useCreateMovieGenres();

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: 'SET_FILTERS',
      payload: { ...state, sort: e.target.value },
    });
  };

  const handleDateFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'SET_FILTERS',
      payload: { ...state, date_from: e.target.value },
    });
  };

  const handleDateTo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'SET_FILTERS',
      payload: { ...state, date_to: e.target.value },
    });
  };

  const updateGenres = (id: number) => {
    if (state?.genres?.includes(id)) {
      dispatch({
        type: 'SET_FILTERS',
        payload: { ...state, genres: state.genres.filter((g) => g !== id) },
      });
    } else {
      dispatch({
        type: 'SET_FILTERS',
        payload: { ...state, genres: [...state.genres, id] },
      });
    }
  };

  const updateTypes = (id: number) => {
    if (state.release_types.includes(id)) {
      dispatch({
        type: 'SET_FILTERS',
        payload: {
          ...state,
          release_types: state.release_types.filter((t) => t !== id),
        },
      });
    } else {
      dispatch({
        type: 'SET_FILTERS',
        payload: { ...state, release_types: [...state.release_types, id] },
      });
    }
  };

  const handleAdult = (e: React.MouseEvent<HTMLDivElement>) => {
    dispatch({
      type: 'SET_FILTERS',
      payload: { ...state, adult: !state.adult },
    });
  };

  return (
    <aside className='sidebar'>
      <div className='sidebar__content'>
        <Section heading='Sort'>
          <form className='form'>
            <select
              className='select-menu'
              name='sort-order'
              value={state.sort}
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
                active={state.genres.includes(genre.id)}
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
              active={state.release_types.includes(1)}
              name='Premiere'
              onClick={() => updateTypes(1)}
            />
            <ToggleButton
              key='theatrical-limited-release'
              active={state.release_types.includes(2)}
              name='Theatrical (limited)'
              onClick={() => updateTypes(2)}
            />
            <ToggleButton
              key='theatrical-release'
              active={state.release_types.includes(3)}
              name='Theatrical'
              onClick={() => updateTypes(3)}
            />
            <ToggleButton
              key='digital-release'
              active={state.release_types.includes(4)}
              name='Digital'
              onClick={() => updateTypes(4)}
            />
            <ToggleButton
              key='physical-release'
              active={state.release_types.includes(5)}
              name='Physical'
              onClick={() => updateTypes(5)}
            />
            <ToggleButton
              key='tv-release'
              active={state.release_types.includes(6)}
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
                value={state.date_from}
                onChange={handleDateFrom}
              />
            </div>
            <div className='form__group'>
              <label htmlFor='date-to'>To</label>
              <input
                type='date'
                name='date-to'
                value={state.date_to}
                onChange={handleDateTo}
              />
            </div>
          </form>
        </Section>
        <Section heading='Adult content'>
          <div className='buttons'>
            <ToggleButton
              active={state.adult}
              name={state.adult ? 'Visible' : 'Hidden'}
              onClick={handleAdult}
            />
          </div>
        </Section>
      </div>
    </aside>
  );
}
