// React
import { useContext } from 'react';

// Context
import { AppContext } from '../../../contexts/AppContext';

// Icons
import { FiSearch } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';

export default function Searchbar() {
  const { state, dispatch } = useContext(AppContext);

  const handleClick = () => {
    dispatch({
      type: 'UPDATE_APP',
      payload: {
        ...state,
        searchbar: { ...state.searchbar, expanded: !state.searchbar.expanded },
        mobile_menu: { active: false },
        mobile_filters_menu: { active: false },
      },
    });
  };
  return (
    <div className='search-icon' onClick={handleClick}>
      {state.searchbar.expanded ? <IoClose /> : <FiSearch />}
    </div>
  );
}
