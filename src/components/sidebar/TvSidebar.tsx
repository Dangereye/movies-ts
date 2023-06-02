import { useContext } from 'react';
import { TvFiltersContext } from '../../contexts/TvFiltersContext';
import Section from './sections/Section';
import ToggleButton from '../buttons/ToggleButton';
import useCreateTvGenres from '../../hooks/useCreateTvGenres';

export default function TvSidebar() {
  const { state, dispatch } = useContext(TvFiltersContext);
  const tvGenres = useCreateTvGenres();
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

  const updateTypes = (id: string) => {
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

  const handleRegion = () => {};
  return (
    <aside className='sidebar'>
      {/* <div className='sidebar__content'>
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
              <option className='select-menu__option' value='revenue.desc'>
                Revenue descending
              </option>
              <option className='select-menu__option' value='revenue.asc'>
                Revenue ascending
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
            </select>
          </form>
        </Section>
        <Section heading='Genres'>
          <div className='buttons'>
            {tvGenres.map((genre) => (
              <ToggleButton
                key={genre.id}
                active={state.genres.includes(genre.id)}
                name={genre.name}
                onClick={() => updateGenres(genre.id)}
              />
            ))}
          </div>
        </Section>
        <Section heading='air dates'>
          <div className='buttons'>
            <ToggleButton
              key='flatrate'
              active={state.release_types.includes('flatrate')}
              name='Stream'
              onClick={() => updateTypes('flatrate')}
            />
            <ToggleButton
              key='free'
              active={state.release_types.includes('free')}
              name='Free'
              onClick={() => updateTypes('free')}
            />
            <ToggleButton
              key='ads'
              active={state.release_types.includes('ads')}
              name='Ads'
              onClick={() => updateTypes('ads')}
            />
            <ToggleButton
              key='rent'
              active={state.release_types.includes('rent')}
              name='Rent'
              onClick={() => updateTypes('rent')}
            />
            <ToggleButton
              key='buy'
              active={state.release_types.includes('buy')}
              name='Buy'
              onClick={() => updateTypes('buy')}
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
      </div> */}
    </aside>
  );
}
