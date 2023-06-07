import { useContext } from 'react';

// Contexts
import { MovieFiltersContext } from '../contexts/MovieFiltersContext';

export default function useAppend() {
  const { state } = useContext(MovieFiltersContext);
  const append = `&sort_by=${state.sort.value}&include_adult=${
    state.adult.active
  }${
    state.release_types.length
      ? `&with_release_type=${state.release_types
          .toString()
          .replaceAll(',', '|')}`
      : ''
  }${
    state.dates.date_from
      ? `&primary_release_date.gte=${state.dates.date_from}`
      : ''
  }${
    state.dates.date_to
      ? `&primary_release_date.lte=${state.dates.date_to}`
      : ''
  }${state.genres.types.length ? `&with_genres=${state.genres.types}` : ''}${
    state.vote_count ? `&vote_count.gte=${state.vote_count}` : ''
  }`;
  return { append };
}
