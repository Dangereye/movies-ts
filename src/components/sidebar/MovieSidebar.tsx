import { useContext } from 'react';

// Context
import { MovieFiltersContext } from '../../contexts/MovieFiltersContext';

// Hooks
import useCreateGenres from '../../hooks/useCreateGenres';
import useMovieFilterFuntions from '../../hooks/useMovieFilterFunctions';
import useCreateCountries from '../../hooks/UseCreateCountries';
import useCreateCertifications from '../../hooks/useCreateCertifications';
import useCreateProviders from '../../hooks/useCreateProviders';

// Components
import Section from './sections/Section';
import ToggleButton from '../buttons/ToggleButton';
import CustomSelectInput from './custom_select_input/CustomSelectInput';
import CustomSelectOption from './custom_select_input/CustomSelectOption';
import NumberInput from '../forms/inputs/NumberInput';
import ProvidersIcon from './providers/ProvidersIcon';

// Data
import { sortOptions } from '../../data/sortOptions';
import { movieReleaseTypes } from '../../data/movieReleaseTypes';

export default function MovieSidebar() {
  const { state } = useContext(MovieFiltersContext);
  const genres = useCreateGenres('movie-genres', 'genre/movie/list');
  const countries = useCreateCountries();
  const providers = useCreateProviders(
    'movie-providers-list',
    'watch/providers/movie'
  );
  const certifications = useCreateCertifications(
    'movie-certifications',
    'certification/movie/list'
  );
  const {
    handleToggleSortSection,
    handleToggleSortInput,
    handleSort,
    handleToggleProviders,
    clearProviders,
    updateProviders,
    handleToggleDates,
    handleDateFrom,
    handleDateTo,
    handleToggleGenres,
    clearGenres,
    updateGenres,
    handleToggleCertificates,
    clearCertificates,
    updateCertificates,
    handleToggleReleaseTypes,
    clearTypes,
    updateTypes,
    handleToggleAdultSection,
    handleToggleRating,
    handleMinRating,
    handleMaxRating,
    handleToggleMinimumVotes,
    handleVoteCount,
    handleAdult,
    preventDefault,
  } = useMovieFilterFuntions();
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
        </Section>
        <Section
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
        </Section>
        <Section
          heading='Certifications'
          expanded={state.certifications.expanded}
          dispatch={handleToggleCertificates}
        >
          <ToggleButton
            active={state.certifications.certs.length === 0}
            name='All'
            onClick={clearCertificates}
          />
          {certifications
            .sort((a, b) => a.order - b.order)
            .map((c) => (
              <ToggleButton
                key={c.name}
                active={state.certifications.certs.includes(c.name)}
                name={c.name}
                onClick={() => updateCertificates(c.name)}
              />
            ))}
        </Section>
        <Section
          heading='Release types'
          expanded={state.release_types.expanded}
          dispatch={handleToggleReleaseTypes}
        >
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
        </Section>
        <Section
          heading='Release dates'
          expanded={state.dates.expanded}
          dispatch={handleToggleDates}
        >
          <form className='form' onSubmit={preventDefault}>
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
        <Section
          heading='Adult content'
          expanded={state.adult.expanded}
          dispatch={handleToggleAdultSection}
        >
          <ToggleButton
            active={state.adult.active}
            name={state.adult.active ? 'Visible' : 'Hidden'}
            onClick={handleAdult}
          />
        </Section>
      </div>
    </aside>
  );
}
