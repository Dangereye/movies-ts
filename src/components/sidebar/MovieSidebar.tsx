import { useContext } from 'react';
import { MovieFiltersContext } from '../../contexts/MovieFiltersContext';
import useCreateMovieGenres from '../../hooks/useCreateMovieGenres';
import Section from './sections/Section';
import ToggleButton from '../buttons/ToggleButton';
import CustomSelectInput from '../custom_select_input/CustomSelectInput';
import CustomSelectOption from '../custom_select_input/CustomSelectOption';
import { movieSortOptions } from '../../data/movieSortOptions';

export default function MovieSidebar() {
  const { state, dispatch } = useContext(MovieFiltersContext);

  const movieGenres = useCreateMovieGenres();

  const handleSort = (e: React.MouseEvent<HTMLDivElement>) => {
    dispatch({
      type: 'SET_FILTERS',
      payload: {
        ...state,
        sort: {
          name: e.currentTarget.innerText,
          value: e.currentTarget.dataset.value,
        },
      },
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
          <CustomSelectInput selected={state.sort.name}>
            {movieSortOptions.map((option) => (
              <CustomSelectOption
                key={option.value}
                onClick={handleSort}
                name={option.name}
                value={option.value}
                active={state.sort.value === option.value}
              />
            ))}
          </CustomSelectInput>
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
