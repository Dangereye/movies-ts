import { useContext } from 'react';

// Contexts
import { MovieFiltersContext } from '../contexts/MovieFiltersContext';

export default function useAppend() {
  const { state } = useContext(MovieFiltersContext);
  const append = `&sort_by=${state.sort.value}${
    state.certifications.certs.length
      ? `&region=GB&certification_country=GB&certification=${state.certifications.certs
          .toString()
          .replaceAll(',', '|')}`
      : ''
  }&vote_average.lte=${state.rating.max_rating}${
    state.providers.ids.length
      ? `&watch_region=GB&with_watch_providers=${state.providers.ids
          .toString()
          .replaceAll(',', '|')}`
      : ''
  }&vote_average.gte=${state.rating.min_rating}&include_adult=${
    state.adult.active
  }${
    state.release_types.types.length
      ? `&with_release_type=${state.release_types.types
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
    state.vote_count.count ? `&vote_count.gte=${state.vote_count.count}` : ''
  }`;
  return { append };
}
