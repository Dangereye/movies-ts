// React
import { useState } from 'react';

// Hooks
import useMovieFilterFuntions from './useMovieFilterFunctions';
import useTvFiltersFunctions from './useTvFiltersFunctions';

export default function useUserRating(type: 'movie' | 'tv') {
  const [minUserRating, setMinUserRating] = useState(0);
  const [maxUserRating, setMaxUserRating] = useState(10);
  const { handleUserRating: handleMovieUserRating } = useMovieFilterFuntions();
  const { handleUserRating: handleTvUserRating } = useTvFiltersFunctions();

  const updateUserRating = (min: number, max: number) => {
    if (min > max) {
      min = max;
      setMinUserRating(max);
    }
    if (type === 'movie') {
      handleMovieUserRating(min, max);
    } else {
      handleTvUserRating(min, max);
    }
  };
  return {
    minUserRating,
    setMinUserRating,
    maxUserRating,
    setMaxUserRating,
    updateUserRating,
  };
}
