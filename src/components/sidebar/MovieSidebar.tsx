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

  const handleToggleSortSection = () => {
    dispatch({
      type: 'SET_FILTERS',
      payload: {
        ...state,
        sort: { ...state.sort, expanded: !state.sort.expanded },
      },
    });
  };

  const handleToggleSortInput = () => {
    dispatch({
      type: 'SET_FILTERS',
      payload: {
        ...state,
        sort: { ...state.sort, inputExpanded: !state.sort.inputExpanded },
      },
    });
  };
  const handleSort = (e: React.MouseEvent<HTMLDivElement>) => {
    dispatch({
      type: 'SET_FILTERS',
      payload: {
        ...state,
        sort: {
          expanded: state.sort.expanded,
          inputExpanded: state.sort.inputExpanded,
          name: e.currentTarget.innerText,
          value: e.currentTarget.dataset.value,
        },
      },
    });
  };

  const handleToggleDates = () => {
    dispatch({
      type: 'SET_FILTERS',
      payload: {
        ...state,
        dates: { ...state.dates, expanded: !state.dates.expanded },
      },
    });
  };

  const handleDateFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'SET_FILTERS',
      payload: {
        ...state,
        dates: {
          ...state.dates,
          expanded: state.dates.expanded,
          date_from: e.target.value,
          date_to: state.dates.date_to,
        },
      },
    });
  };

  const handleDateTo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'SET_FILTERS',
      payload: {
        ...state,
        dates: {
          ...state.dates,
          expanded: state.dates.expanded,
          date_from: state.dates.date_from,
          date_to: e.target.value,
        },
      },
    });
  };

  const handleToggleGenres = () => {
    dispatch({
      type: 'SET_FILTERS',
      payload: {
        ...state,
        genres: { ...state.genres, expanded: !state.genres.expanded },
      },
    });
  };

  const updateGenres = (id: number) => {
    if (state?.genres?.types.includes(id)) {
      dispatch({
        type: 'SET_FILTERS',
        payload: {
          ...state,
          genres: {
            expanded: state.genres.expanded,
            types: state.genres.types.filter((g) => g !== id),
          },
        },
      });
    } else {
      dispatch({
        type: 'SET_FILTERS',
        payload: {
          ...state,
          genres: {
            expanded: state.genres.expanded,
            types: [...state.genres.types, id],
          },
        },
      });
    }
  };

  const handleToggleReleaseTypes = () => {
    dispatch({
      type: 'SET_FILTERS',
      payload: {
        ...state,
        release_types: {
          ...state.release_types,
          expanded: !state.release_types.expanded,
        },
      },
    });
  };

  const clearTypes = () => {
    dispatch({
      type: 'SET_FILTERS',
      payload: {
        ...state,
        release_types: { ...state.release_types, types: [] },
      },
    });
  };

  const updateTypes = (id: number) => {
    if (state.release_types.types.includes(id)) {
      dispatch({
        type: 'SET_FILTERS',
        payload: {
          ...state,
          release_types: {
            ...state.release_types,
            types: state.release_types.types.filter((t) => t !== id),
          },
        },
      });
    } else {
      dispatch({
        type: 'SET_FILTERS',
        payload: {
          ...state,
          release_types: {
            ...state.release_types,
            types: [...state.release_types.types, id],
          },
        },
      });
    }
  };

  const handleToggleAdultSection = () => {
    dispatch({
      type: 'SET_FILTERS',
      payload: {
        ...state,
        adult: { expanded: !state.adult.expanded, active: state.adult.active },
      },
    });
  };
  const handleAdult = (e: React.MouseEvent<HTMLDivElement>) => {
    dispatch({
      type: 'SET_FILTERS',
      payload: {
        ...state,
        adult: { expanded: state.adult.expanded, active: !state.adult.active },
      },
    });
  };
  return (
    <aside className='sidebar'>
      <div className='sidebar__content'>
        <Section
          heading='Sort'
          expanded={state.sort.expanded}
          dispatch={handleToggleSortSection}
        >
          <CustomSelectInput
            selected={state.sort.name}
            expanded={state.sort.inputExpanded}
            dispatch={handleToggleSortInput}
          >
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
        <Section
          heading='Genres'
          expanded={state.genres.expanded}
          dispatch={handleToggleGenres}
        >
          <div className='buttons'>
            {movieGenres.map((genre) => (
              <ToggleButton
                key={genre.id}
                active={state.genres.types.includes(genre.id)}
                name={genre.name}
                onClick={() => updateGenres(genre.id)}
              />
            ))}
          </div>
        </Section>
        <Section
          heading='release types'
          expanded={state.release_types.expanded}
          dispatch={handleToggleReleaseTypes}
        >
          <div className='buttons'>
            <ToggleButton
              key='premiere-release'
              active={state.release_types.types.length === 0}
              name='All'
              onClick={clearTypes}
            />
            <ToggleButton
              key='premiere-release'
              active={state.release_types.types.includes(1)}
              name='Premiere'
              onClick={() => updateTypes(1)}
            />
            <ToggleButton
              key='theatrical-limited-release'
              active={state.release_types.types.includes(2)}
              name='Theatrical (limited)'
              onClick={() => updateTypes(2)}
            />
            <ToggleButton
              key='theatrical-release'
              active={state.release_types.types.includes(3)}
              name='Theatrical'
              onClick={() => updateTypes(3)}
            />
            <ToggleButton
              key='digital-release'
              active={state.release_types.types.includes(4)}
              name='Digital'
              onClick={() => updateTypes(4)}
            />
            <ToggleButton
              key='physical-release'
              active={state.release_types.types.includes(5)}
              name='Physical'
              onClick={() => updateTypes(5)}
            />
            <ToggleButton
              key='tv-release'
              active={state.release_types.types.includes(6)}
              name='TV'
              onClick={() => updateTypes(6)}
            />
          </div>
        </Section>
        <Section
          heading='release dates'
          expanded={state.dates.expanded}
          dispatch={handleToggleDates}
        >
          <form className='form'>
            <div className='form__group'>
              <label htmlFor='date-from'>From</label>
              <input
                type='date'
                name='date-from'
                value={state.dates.date_from}
                onChange={handleDateFrom}
              />
            </div>
            <div className='form__group'>
              <label htmlFor='date-to'>To</label>
              <input
                type='date'
                name='date-to'
                value={state.dates.date_to}
                onChange={handleDateTo}
              />
            </div>
          </form>
        </Section>
        <Section
          heading='Adult content'
          expanded={state.adult.expanded}
          dispatch={handleToggleAdultSection}
        >
          <div className='buttons'>
            <ToggleButton
              active={state.adult.active}
              name={state.adult.active ? 'Visible' : 'Hidden'}
              onClick={handleAdult}
            />
          </div>
        </Section>
      </div>
    </aside>
  );
}
