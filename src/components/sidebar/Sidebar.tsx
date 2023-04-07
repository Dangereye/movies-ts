import { useContext } from 'react';
import Section from './sections/Section';
import { FiltersContext } from '../../contexts/FiltersContext';

export default function Sidebar() {
  const { dateFrom, setDateFrom, dateTo, setDateTo } =
    useContext(FiltersContext);
  const handleDateFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateFrom(e.target.value);
  };
  const handleDateTo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateTo(e.target.value);
  };

  return (
    <aside className='sidebar'>
      <div className='sidebar__content'>
        {/* <Section heading='Genres'>
          <Navigation
            variant='vertical'
            getId={(item) => item.id}
            getLink={(item) => `/genre/${item.id}/movie`}
            renderItem={(item) => item.name}
            data={genres}
          />
        </Section> */}
        <Section heading='release dates'>
          <form className='form'>
            <div className='form__group'>
              <label htmlFor='date-from'>From</label>
              <input
                type='date'
                name='date-from'
                value={dateFrom}
                onChange={handleDateFrom}
              />
            </div>
            <div className='form__group'>
              <label htmlFor='date-to'>To</label>
              <input
                type='date'
                name='date-to'
                value={dateTo}
                onChange={handleDateTo}
              />
            </div>
          </form>
        </Section>
      </div>
    </aside>
  );
}
