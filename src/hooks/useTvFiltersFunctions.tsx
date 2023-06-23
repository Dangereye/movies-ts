import { useContext } from 'react';
import { TvFiltersContext } from '../contexts/TvFiltersContext';

export default function useTvFiltersFunctions() {
  const { state, dispatch } = useContext(TvFiltersContext);

  const handleToggleSortSection = () => {
    dispatch({
      type: 'SET_FILTERS',
      payload: {
        ...state,
        sort: { ...state.sort, expanded: !state.sort.expanded },
      },
    });
  };

  const handleToggleSortInput = () => {
    dispatch({
      type: 'SET_FILTERS',
      payload: {
        ...state,
        sort: { ...state.sort, inputExpanded: !state.sort.inputExpanded },
      },
    });
  };

  const handleSort = (e: React.MouseEvent<HTMLDivElement>) => {
    dispatch({
      type: 'SET_FILTERS',
      payload: {
        ...state,
        sort: {
          ...state.sort,
          name: e.currentTarget.innerText,
          value: e.currentTarget.dataset.value,
          inputExpanded: false,
        },
      },
    });
  };
  return { handleToggleSortSection, handleToggleSortInput, handleSort };
}