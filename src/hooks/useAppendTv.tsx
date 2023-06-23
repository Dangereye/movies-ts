import { useContext } from 'react';

// Contexts
import { TvFiltersContext } from '../contexts/TvFiltersContext';

export default function useAppendTv() {
  const { state } = useContext(TvFiltersContext);

  const append = `&watch_region=GB&sort_by=${state.sort.value}${
    state.providers.ids.length
      ? `&with_watch_providers=${state.providers.ids
          .toString()
          .replaceAll(',', '|')}`
      : ''
  }&include_adult=${state.adult}${
    state.release_types.length
      ? `&with_watch_monetization_types=${state.release_types
          .toString()
          .replaceAll(',', '|')}`
      : ''
  }${state.date_from ? `&air_date.gte=${state.date_from}` : ''}${
    state.date_to ? `&air_date.lte=${state.date_to}` : ''
  }${state.genres.types.length ? `&with_genres=${state.genres.types}` : ''}${
    state.vote_count ? `&vote_count.gte=${state.vote_count}` : ''
  }`;

  return { append };
}
