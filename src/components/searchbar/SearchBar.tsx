import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import Container from '../container/Container';
import { AppContext } from '../../contexts/AppContext';

export default function Searchbar() {
  const [query, setQuery] = useState('');
  const { state } = useContext(AppContext);

  const navigate = useNavigate();

  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuery(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/search/${query}`);
  };
  return (
    <div
      className={state.searchbar.expanded ? 'searchbar active' : 'searchbar'}
    >
      <Container>
        <form className='searchbar__form' onSubmit={handleSubmit}>
          <input
            className='searchbar__input'
            type='text'
            placeholder='Search Movies, TV Shows or People'
            onChange={handleQuery}
          />
        </form>
      </Container>
    </div>
  );
}
