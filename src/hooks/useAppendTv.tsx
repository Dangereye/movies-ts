import { useContext } from 'react';

// Contexts
import { TvFiltersContext } from '../contexts/TvFiltersContext';

export default function useAppendTv() {
  const { state } = useContext(TvFiltersContext);

  const append = `&sort_by=${state.sort.value}&include_adult=${
    state.adult
  }&watch_region=${state.region}${
    state.release_types.length
      ? `&with_watch_monetization_types=${state.release_types
          .toString()
          .replaceAll(',', '|')}`
      : ''
  }${state.date_from ? `&air_date.gte=${state.date_from}` : ''}${
    state.date_to ? `&air_date.lte=${state.date_to}` : ''
  }${state.genres.length ? `&with_genres=${state.genres}` : ''}${
    state.vote_count ? `&vote_count.gte=${state.vote_count}` : ''
  }`;

  return { append };
}
