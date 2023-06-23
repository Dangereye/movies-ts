import { useContext } from 'react';
import { TvFiltersContext } from '../../contexts/TvFiltersContext';
import Section from './sections/Section';
import ToggleButton from '../buttons/ToggleButton';
import useCreateTvGenres from '../../hooks/useCreateTvGenres';
import useTvFiltersFunctions from '../../hooks/useTvFiltersFunctions';
import CustomSelectInput from '../custom_select_input/CustomSelectInput';
import { sortOptions } from '../../data/sortOptions';
import CustomSelectOption from '../custom_select_input/CustomSelectOption';
import ProvidersIcon from '../providers/ProvidersIcon';
import useCreateProviders from '../../hooks/useCreateProviders';

export default function TvSidebar() {
  const { state, dispatch } = useContext(TvFiltersContext);
  const tvGenres = useCreateTvGenres();
  const providers = useCreateProviders(
    'tv-providers-list',
    'watch/providers/tv'
  );
  const {
    handleToggleSortSection,
    handleToggleSortInput,
    handleSort,
    handleToggleProviders,
    clearProviders,
    updateProviders,
    handleToggleGenres,
    clearGenres,
    updateGenres,
    handleToggleDates,
    handleDateFrom,
    handleDateTo,
  } = useTvFiltersFunctions();

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
        <Section
          heading='Providers'
          expanded={state.providers.expanded}
          dispatch={handleToggleProviders}
        >
          <div className='buttons'>
            <ToggleButton
              active={state.providers.ids.length === 0}
              name='All'
              onClick={clearProviders}
            />
          </div>
          <div className='providers'>
            {providers.map((p) => (
              <ProvidersIcon
                key={p.provider_id}
                id={p.provider_id}
                active={state.providers.ids.includes(p.provider_id)}
                name={p.provider_name}
                logo={p.logo_path}
                onClick={() => updateProviders(p.provider_id)}
              />
            ))}
          </div>
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
            {tvGenres.map((genre) => (
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
          heading='air dates'
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
        {/*<Section heading='Adult content'>
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
