// React
import { useContext } from 'react';

// Context
import { AppContext } from '../../contexts/AppContext';
import { TvFiltersContext } from '../../contexts/TvFiltersContext';

// Hooks
import useCreateGenres from '../../hooks/useCreateGenres';
import useTvFiltersFunctions from '../../hooks/useTvFiltersFunctions';
import useCreateCountries from '../../hooks/useCreateCountries';
import useCreateProviders from '../../hooks/useCreateProviders';

// Components
import SidebarSection from './sections/SidebarSection';
import ToggleButton from '../buttons/ToggleButton';
import CustomSelectInput from './custom_select_input/CustomSelectInput';
import CustomSelectOption from './custom_select_input/CustomSelectOption';
import ProvidersIcon from './providers/ProvidersIcon';
import NumberInput from '../forms/inputs/NumberInput';

// Data
import { sortOptions } from '../../data/sortOptions';
import { tvMonetizationTypes } from '../../data/tvMonetizationTypes';

export default function TvSidebar() {
  const { state: appState } = useContext(AppContext);
  const { state } = useContext(TvFiltersContext);
  const genres = useCreateGenres('tv-genres', 'genre/tv/list');
  const providers = useCreateProviders('tv-providers', 'watch/providers/tv');
  const countries = useCreateCountries();
  const {
    handleToggleSortSection,
    handleToggleSortInput,
    handleSort,
    handleToggleRegionSection,
    handleToggleRegionInput,
    handleRegion,
    handleToggleProviders,
    clearProviders,
    updateProviders,
    handleToggleGenres,
    clearGenres,
    updateGenres,
    handleToggleDates,
    handleDateFrom,
    handleDateTo,
    handleToggleReleaseTypes,
    clearTypes,
    updateTypes,
    handleToggleRating,
    handleMinRating,
    handleMaxRating,
    handleToggleMinimumVotes,
    handleVoteCount,
    handleToggleAdultSection,
    handleAdult,
    preventDefault,
  } = useTvFiltersFunctions();

  return (
    <>
      <SidebarSection
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
      </SidebarSection>
      <SidebarSection
        heading='region'
        expanded={appState.region.expanded}
        dispatch={handleToggleRegionSection}
      >
        <CustomSelectInput
          selected={appState.region.name}
          expanded={appState.region.inputExpanded}
          dispatch={handleToggleRegionInput}
        >
          {countries
            ?.sort((a, b) => {
              if (a.english_name < b.english_name) {
                return -1;
              }
              if (a.english_name > b.english_name) {
                return 1;
              }
              return 0;
            })
            .map((c) => (
              <CustomSelectOption
                key={c.iso_3166_1}
                onClick={handleRegion}
                name={c.english_name}
                value={c.iso_3166_1}
                active={appState.region.value === c.iso_3166_1}
              />
            ))}
        </CustomSelectInput>
      </SidebarSection>
      <SidebarSection
        heading='Providers'
        expanded={state.providers.expanded}
        dispatch={handleToggleProviders}
      >
        <ToggleButton
          active={state.providers.ids.length === 0}
          name='All'
          onClick={clearProviders}
        />
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
      </SidebarSection>
      <SidebarSection
        heading='Release types'
        expanded={state.release_types.expanded}
        dispatch={handleToggleReleaseTypes}
      >
        <ToggleButton
          active={state.release_types.types.length === 0}
          name='All'
          onClick={clearTypes}
        />
        {tvMonetizationTypes.map((t) => (
          <ToggleButton
            key={t.name}
            active={state.release_types.types.includes(t.value)}
            name={t.name}
            onClick={() => updateTypes(t.value)}
          />
        ))}
      </SidebarSection>
      <SidebarSection
        heading='Genres'
        expanded={state.genres.expanded}
        dispatch={handleToggleGenres}
      >
        <ToggleButton
          active={state.genres.types.length === 0}
          name='All'
          onClick={clearGenres}
        />
        {genres.map((genre) => (
          <ToggleButton
            key={genre.id}
            active={state.genres.types.includes(genre.id)}
            name={genre.name}
            onClick={() => updateGenres(genre.id)}
          />
        ))}
      </SidebarSection>
      <SidebarSection
        heading='air dates'
        expanded={state.dates.expanded}
        dispatch={handleToggleDates}
      >
        <form className='form'>
          <div className='form__group'>
            <label htmlFor='date-from'>From</label>
            <input
              id='date-from'
              type='date'
              name='date-from'
              value={state.dates.date_from}
              onChange={handleDateFrom}
            />
          </div>
          <div className='form__group'>
            <label htmlFor='date-to'>To</label>
            <input
              id='date-to'
              type='date'
              name='date-to'
              value={state.dates.date_to}
              onChange={handleDateTo}
            />
          </div>
        </form>
      </SidebarSection>
      <SidebarSection
        heading='User Ratings'
        expanded={state.rating.expanded}
        dispatch={handleToggleRating}
      >
        <form className='form' onSubmit={preventDefault}>
          <div className='form__group'>
            <label htmlFor='min-rating'>Min</label>
            <NumberInput
              id='min-rating'
              init={state.rating.min_rating}
              min={0}
              max={9}
              func={handleMinRating}
            />
          </div>
          <div className='form__group'>
            <label htmlFor='max-rating'>Max</label>
            <NumberInput
              id='max-rating'
              init={state.rating.max_rating}
              min={1}
              max={10}
              func={handleMaxRating}
            />
          </div>
        </form>
      </SidebarSection>
      <SidebarSection
        heading='User Votes'
        expanded={state.vote_count.expanded}
        dispatch={handleToggleMinimumVotes}
      >
        <form className='form' onSubmit={preventDefault}>
          <div className='form__group'>
            <label htmlFor='min-votes'>Min</label>
            <NumberInput
              id='min-votes'
              init={state.vote_count.count}
              min={0}
              max={500}
              func={handleVoteCount}
            />
          </div>
        </form>
      </SidebarSection>
      <SidebarSection
        heading='Adult content'
        expanded={appState.adult.expanded}
        dispatch={handleToggleAdultSection}
      >
        <ToggleButton
          active={appState.adult.active}
          name={appState.adult.active ? 'Visible' : 'Hidden'}
          onClick={handleAdult}
        />
      </SidebarSection>
    </>
  );
}
