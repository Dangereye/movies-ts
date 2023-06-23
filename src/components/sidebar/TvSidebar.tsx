import { useContext } from 'react';
import { TvFiltersContext } from '../../contexts/TvFiltersContext';
import Section from './sections/Section';
import ToggleButton from '../buttons/ToggleButton';
import useCreateTvGenres from '../../hooks/useCreateTvGenres';
import useTvFiltersFunctions from '../../hooks/useTvFiltersFunctions';
import CustomSelectInput from '../custom_select_input/CustomSelectInput';
import { sortOptions } from '../../data/sortOptions';
import CustomSelectOption from '../custom_select_input/CustomSelectOption';

export default function TvSidebar() {
  const { state, dispatch } = useContext(TvFiltersContext);
  const tvGenres = useCreateTvGenres();
  const { handleToggleSortSection, handleToggleSortInput, handleSort } =
    useTvFiltersFunctions();

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
            {sortOptions.map((option) => (
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
        {/* <Section heading='Genres'>
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
        </Section> */}
      </div>
    </aside>
  );
}
