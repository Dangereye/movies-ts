import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Searchbar() {
  const [query, setQuery] = useState('');

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
    <div className='searchbar'>
      <form className='form' onSubmit={handleSubmit}>
        <input type='text' onChange={handleQuery} />
      </form>
    </div>
  );
}
