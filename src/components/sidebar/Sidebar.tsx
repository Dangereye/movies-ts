import { useState } from 'react';
import useCreateMovieGenres from '../../hooks/useCreateMovieGenres';
import Button from '../buttons/Button';
import Navigation from '../navigation/Navigation';
import Section from './sections/Section';

export default function Sidebar() {
  const genres = useCreateMovieGenres();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  const handleSubmit = () => {};

  return (
    <aside className='sidebar'>
      <div className='sidebar__content'>
        <Section heading='Genres'>
          <Navigation
            variant='vertical'
            getId={(item) => item.id}
            getLink={(item) => `/genre/${item.id}/movie`}
            renderItem={(item) => item.name}
            data={genres}
          />
        </Section>
        <Section heading='release dates'>
          <form className='form'>
            <div className='form__group'>
              <label htmlFor='start-date'>From</label>
              <input
                type='date'
                name='start-date'
                value={startDate}
                onChange={handleStartDate}
              />
            </div>
            <div className='form__group'>
              <label htmlFor='end-date'>To</label>
              <input
                type='date'
                name='end-date'
                value={endDate}
                onChange={handleEndDate}
              />
            </div>
            <Button
              type='submit'
              variant='btn--primary'
              name='submit'
              onClick={handleSubmit}
            />
          </form>
        </Section>
      </div>
    </aside>
  );
}
