import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { IoCloseSharp } from 'react-icons/io5';

export default function Searchbar() {
  const [isActive, setIsActive] = useState(false);
  const [query, setQuery] = useState('');

  const handleOpen = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsActive(true);
  };

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsActive(false);
  };

  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuery(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuery('');
  };

  return (
    <div className={isActive ? 'searchbar active' : 'searchbar'}>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          className='searchbar__input'
          value={query}
          onChange={handleQuery}
        />
      </form>
      <div className='searchbar__icon' onClick={handleOpen}>
        <FiSearch />
      </div>
      <div className='searchbar__close' onClick={handleClose}>
        <IoCloseSharp />
      </div>
    </div>
  );
}
