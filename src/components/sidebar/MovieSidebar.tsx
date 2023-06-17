import { useContext } from 'react';

// Context
import { MovieFiltersContext } from '../../contexts/MovieFiltersContext';

// Hooks
import useCreateMovieGenres from '../../hooks/useCreateMovieGenres';
import useMovieFilterFuntions from '../../hooks/useMovieFilterFunctions';

// Components
import Section from './sections/Section';
import ToggleButton from '../buttons/ToggleButton';
import CustomSelectInput from '../custom_select_input/CustomSelectInput';
import CustomSelectOption from '../custom_select_input/CustomSelectOption';
import NumberInput from '../forms/inputs/NumberInput';

// Data
import { movieSortOptions } from '../../data/movieSortOptions';
import { movieReleaseTypes } from '../../data/movieReleaseTypes';
import useCreateCountries from '../../hooks/UseCreateCountries';
import useCreateMovieCertifications from '../../hooks/useCreateMovieCertifications';

export default function MovieSidebar() {
  const { state } = useContext(MovieFiltersContext);
  const movieGenres = useCreateMovieGenres();
  const countries = useCreateCountries();
  const certificationList = useCreateMovieCertifications();
  const {
    handleToggleSortSection,
    handleToggleSortInput,
    handleSort,
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
  } = useMovieFilterFuntions();
  console.log(certificationList);
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
          heading='certification'
          expanded={state.certifications.expanded}
          dispatch={handleToggleCertificates}
        >
          <div className='buttons'>
            <ToggleButton
              active={state.certifications.certs.length === 0}
              name='All'
              onClick={clearGenres}
            />
            {certificationList.map((cert) => (
              <ToggleButton
                key={cert}
                active={state.certifications.certs.includes(cert)}
                name={cert}
                onClick={() => updateCertificates(cert)}
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
