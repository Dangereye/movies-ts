import { useContext } from 'react';

// Contexts
import { FiltersContext } from '../contexts/FiltersContext';

export default function useAppend() {
  const { state } = useContext(FiltersContext);
  const append = `&sort_by=${state.sort}&include_adult=${state.adult}${
    state.release_types.length
      ? `&with_release_type=${state.release_types
          .toString()
          .replaceAll(',', '|')}`
      : ''
  }${state.date_from ? `&primary_release_date.gte=${state.date_from}` : ''}${
    state.date_to ? `&primary_release_date.lte=${state.date_to}` : ''
  }${state.genres.length ? `&with_genres=${state.genres}` : ''}${
    state.vote_count ? `&vote_count.gte=${state.vote_count}` : ''
  }`;
  return { append };
}
