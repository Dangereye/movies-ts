import { useContext } from 'react';

// Contexts
import { TvFiltersContext } from '../contexts/TvFiltersContext';

export default function useAppend() {
  const { state } = useContext(TvFiltersContext);
  const append = `&sort_by=${state.sort}&watch_region=${
    state.region
  }&with_watch_monetization_types=${state.release_types
    .toString()
    .replace(',', '|')}`;
  return { append };
}
