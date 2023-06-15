import { useContext } from 'react';

// Context
import { MovieFiltersContext } from '../../contexts/MovieFiltersContext';

// Hooks
import useCreateMovieGenres from '../../hooks/useCreateMovieGenres';

// Components
import Section from './sections/Section';
import ToggleButton from '../buttons/ToggleButton';
import CustomSelectInput from '../custom_select_input/CustomSelectInput';
import CustomSelectOption from '../custom_select_input/CustomSelectOption';
import NumberInput from '../forms/inputs/NumberInput';

// Data
import { movieSortOptions } from '../../data/movieSortOptions';
import { movieReleaseTypes } from '../../data/movieReleaseTypes';

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
          ...state.sort,
          name: e.currentTarget.innerText,
          value: e.currentTarget.dataset.value,
          inputExpanded: false,
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
          date_from: e.target.value,
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

  const clearGenres = () => {
    dispatch({
      type: 'SET_FILTERS',
      payload: { ...state, genres: { ...state.genres, types: [] } },
    });
  };

  const updateGenres = (id: number) => {
    if (state?.genres?.types.includes(id)) {
      dispatch({
        type: 'SET_FILTERS',
        payload: {
          ...state,
          genres: {
            ...state.genres,
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
            ...state.genres,
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
        adult: { ...state.adult, expanded: !state.adult.expanded },
      },
    });
  };

  const handleToggleRating = () => {
    dispatch({
      type: 'SET_FILTERS',
      payload: {
        ...state,
        rating: { ...state.rating, expanded: !state.rating.expanded },
      },
    });
  };

  const handleMinRating = (value: number) => {
    dispatch({
      type: 'SET_FILTERS',
      payload: {
        ...state,
        rating: { ...state.rating, min_rating: value },
      },
    });
  };

  const handleMaxRating = (value: number) => {
    dispatch({
      type: 'SET_FILTERS',
      payload: {
        ...state,
        rating: { ...state.rating, max_rating: value },
      },
    });
  };

  const handleToggleMinimumVotes = () => {
    dispatch({
      type: 'SET_FILTERS',
      payload: {
        ...state,
        vote_count: {
          ...state.vote_count,
          expanded: !state.vote_count.expanded,
        },
      },
    });
  };

  const handleVoteCount = (value: number) => {
    dispatch({
      type: 'SET_FILTERS',
      payload: {
        ...state,
        vote_count: { ...state.vote_count, count: value },
      },
    });
  };

  const handleAdult = (e: React.MouseEvent<HTMLDivElement>) => {
    dispatch({
      type: 'SET_FILTERS',
      payload: {
        ...state,
        adult: { ...state.adult, active: !state.adult.active },
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
            <ToggleButton
              active={state.genres.types.length === 0}
              name='All'
              onClick={clearGenres}
            />
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
              active={state.release_types.types.length === 0}
              name='All'
              onClick={clearTypes}
            />
            {movieReleaseTypes.map((type) => (
              <ToggleButton
                key={`release-type-${type.name}`}
                active={state.release_types.types.includes(type.value)}
                name={type.name}
                onClick={() => updateTypes(type.value)}
              />
            ))}
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
                id='date-from'
                value={state.dates.date_from}
                onChange={handleDateFrom}
              />
            </div>
            <div className='form__group'>
              <label htmlFor='date-to'>To</label>
              <input
                type='date'
                id='date-to'
                value={state.dates.date_to}
                onChange={handleDateTo}
              />
            </div>
          </form>
        </Section>
        <Section
          heading='rating'
          expanded={state.rating.expanded}
          dispatch={handleToggleRating}
        >
          <div className='form'>
            <div className='form__group'>
              <label htmlFor='min-rating'>Min</label>
              <NumberInput
                init={state.rating.min_rating}
                min={0}
                max={9}
                id='min-rating'
                func={handleMinRating}
              />
            </div>
            <div className='form__group'>
              <label htmlFor='max-rating'>Max</label>
              <NumberInput
                init={state.rating.max_rating}
                min={1}
                max={10}
                id='max-rating'
                func={handleMaxRating}
              />
            </div>
          </div>
        </Section>
        <Section
          heading='Votes'
          expanded={state.vote_count.expanded}
          dispatch={handleToggleMinimumVotes}
        >
          <form className='form'>
            <div className='form__group'>
              <label htmlFor='min-votes'>Min</label>
              <NumberInput
                init={state.vote_count.count}
                min={0}
                max={500}
                id='min-votes'
                func={handleVoteCount}
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
