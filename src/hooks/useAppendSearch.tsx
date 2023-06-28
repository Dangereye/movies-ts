import { useContext } from 'react';
import { SearchFiltersContext } from '../contexts/SearchFiltersContext';

export default function useAppendSearch() {
  const { state } = useContext(SearchFiltersContext);
  const append = `&region=GB&language=en-GB&include_adult=${state.adult.active}`;

  return append;
}
