import { useContext } from 'react';
import { TvFiltersContext } from '../../contexts/TvFiltersContext';
import Section from './sections/Section';
import ToggleButton from '../buttons/ToggleButton';
import useCreateGenres from '../../hooks/useCreateGenres';
import useTvFiltersFunctions from '../../hooks/useTvFiltersFunctions';
import CustomSelectInput from '../custom_select_input/CustomSelectInput';
import { sortOptions } from '../../data/sortOptions';
import CustomSelectOption from '../custom_select_input/CustomSelectOption';
import ProvidersIcon from '../providers/ProvidersIcon';
import useCreateProviders from '../../hooks/useCreateProviders';
import { tvMonetizationTypes } from '../../data/tvMonetizationTypes';
import NumberInput from '../forms/inputs/NumberInput';

export default function TvSidebar() {
  const { state } = useContext(TvFiltersContext);
  const genres = useCreateGenres('tv-genres', 'genre/tv/list');
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
    handleToggleReleaseTypes,
    clearTypes,
    updateTypes,
    handleToggleRating,
    handleMinRating,
    handleMaxRating,
    handleToggleMinimumVotes,
    handleVoteCount,
    preventDefault,
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
          heading='Release types'
          expanded={state.release_types.expanded}
          dispatch={handleToggleReleaseTypes}
        >
          <div className='buttons'>
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
            {genres.map((genre) => (
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
        <Section
          heading='User Ratings'
          expanded={state.rating.expanded}
          dispatch={handleToggleRating}
        >
          <form className='form' onSubmit={preventDefault}>
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
          </form>
        </Section>
        <Section
          heading='User Votes'
          expanded={state.vote_count.expanded}
          dispatch={handleToggleMinimumVotes}
        >
          <form className='form' onSubmit={preventDefault}>
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
      </div>
    </aside>
  );
}
