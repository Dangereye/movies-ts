// React
import { useState, useRef, useContext } from 'react';

// React router
import { useNavigate } from 'react-router-dom';

// Context
import { AppContext } from '../../contexts/AppContext';

// Components
import Container from '../container/Container';

// Icons
import { FiSearch } from 'react-icons/fi';

export default function Searchbar() {
  const [query, setQuery] = useState('');
  const { state } = useContext(AppContext);

  const input = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuery(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query !== '') {
      navigate(`/search/${query}`);
      setQuery('');
      input.current?.blur();
    }
  };
  return (
    <div
      className={state.searchbar.expanded ? 'searchbar active' : 'searchbar'}
    >
      <Container>
        <form className='searchbar__form' onSubmit={handleSubmit}>
          <div className='searchbar__icon'>
            <FiSearch />
          </div>
          <input
            ref={input}
            className='searchbar__input'
            type='text'
            value={query}
            placeholder='Search Movies, TV Shows or People'
            onChange={handleQuery}
          />
        </form>
      </Container>
    </div>
  );
}
