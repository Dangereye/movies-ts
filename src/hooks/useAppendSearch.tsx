// React
import { useContext } from 'react';

// Contexts
import { AppContext } from '../contexts/AppContext';

export default function useAppendSearch() {
  const { state } = useContext(AppContext);
  const append = `&region=${state.region.value}&language=en-GB&include_adult=${state.adult.active}`;

  return append;
}
