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
    state.release_types.types.length
      ? `&with_watch_monetization_types=${state.release_types.types
          .toString()
          .replaceAll(',', '|')}`
      : ''
  }${state.dates.date_from ? `&air_date.gte=${state.dates.date_from}` : ''}${
    state.dates.date_to ? `&air_date.lte=${state.dates.date_to}` : ''
  }${
    state.genres.types.length ? `&with_genres=${state.genres.types}` : ''
  }&vote_average.lte=${state.rating.max_rating}&vote_average.gte=${
    state.rating.min_rating
  }${state.vote_count ? `&vote_count.gte=${state.vote_count}` : ''}`;

  return { append };
}
