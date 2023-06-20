import { useContext } from 'react';

// Context
import { MovieFiltersContext } from '../contexts/MovieFiltersContext';

export default function useMovieFilterFuntions() {
  const { state, dispatch } = useContext(MovieFiltersContext);

  const handleToggleSortSection = () => {
    dispatch({
      type: 'SET_FILTERS',
      payload: {
        ...state,
        sort: { ...state.sort, expanded: !state.sort.expanded },
      },
    });
  };

  const handleToggleSortInput = () => {
    dispatch({
      type: 'SET_FILTERS',
      payload: {
        ...state,
        sort: { ...state.sort, inputExpanded: !state.sort.inputExpanded },
      },
    });
  };

  const handleSort = (e: React.MouseEvent<HTMLDivElement>) => {
    dispatch({
      type: 'SET_FILTERS',
      payload: {
        ...state,
        sort: {
          ...state.sort,
          name: e.currentTarget.innerText,
          value: e.currentTarget.dataset.value,
          inputExpanded: false,
        },
      },
    });
  };

  const handleToggleDates = () => {
    dispatch({
      type: 'SET_FILTERS',
      payload: {
        ...state,
        dates: { ...state.dates, expanded: !state.dates.expanded },
      },
    });
  };

  const handleDateFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'SET_FILTERS',
      payload: {
        ...state,
        dates: {
          ...state.dates,
          date_from: e.target.value,
        },
      },
    });
  };

  const handleDateTo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'SET_FILTERS',
      payload: {
        ...state,
        dates: {
          ...state.dates,
          date_to: e.target.value,
        },
      },
    });
  };

  const handleToggleGenres = () => {
    dispatch({
      type: 'SET_FILTERS',
      payload: {
        ...state,
        genres: { ...state.genres, expanded: !state.genres.expanded },
      },
    });
  };

  const clearGenres = () => {
    dispatch({
      type: 'SET_FILTERS',
      payload: { ...state, genres: { ...state.genres, types: [] } },
    });
  };

  const updateGenres = (id: number) => {
    if (state?.genres?.types.includes(id)) {
      dispatch({
        type: 'SET_FILTERS',
        payload: {
          ...state,
          genres: {
            ...state.genres,
            types: state.genres.types.filter((g) => g !== id),
          },
        },
      });
    } else {
      dispatch({
        type: 'SET_FILTERS',
        payload: {
          ...state,
          genres: {
            ...state.genres,
            types: [...state.genres.types, id],
          },
        },
      });
    }
  };
  const handleToggleCertificates = () => {
    dispatch({
      type: 'SET_FILTERS',
      payload: {
        ...state,
        certifications: {
          ...state.certifications,
          expanded: !state.certifications.expanded,
        },
      },
    });
  };

  const clearCertificates = () => {
    dispatch({
      type: 'SET_FILTERS',
      payload: {
        ...state,
        certifications: { ...state.certifications, certs: [] },
      },
    });
  };

  const updateCertificates = (value: string) => {
    if (state?.certifications?.certs.includes(value)) {
      dispatch({
        type: 'SET_FILTERS',
        payload: {
          ...state,
          certifications: {
            ...state.certifications,
            certs: state.certifications.certs.filter((c) => c !== value),
          },
        },
      });
    } else {
      dispatch({
        type: 'SET_FILTERS',
        payload: {
          ...state,
          certifications: {
            ...state.certifications,
            certs: [...state.certifications.certs, value],
          },
        },
      });
    }
  };

  const handleToggleReleaseTypes = () => {
    dispatch({
      type: 'SET_FILTERS',
      payload: {
        ...state,
        release_types: {
          ...state.release_types,
          expanded: !state.release_types.expanded,
        },
      },
    });
  };

  const clearTypes = () => {
    dispatch({
      type: 'SET_FILTERS',
      payload: {
        ...state,
        release_types: { ...state.release_types, types: [] },
      },
    });
  };

  const updateTypes = (id: number) => {
    if (state.release_types.types.includes(id)) {
      dispatch({
        type: 'SET_FILTERS',
        payload: {
          ...state,
          release_types: {
            ...state.release_types,
            types: state.release_types.types.filter((t) => t !== id),
          },
        },
      });
    } else {
      dispatch({
        type: 'SET_FILTERS',
        payload: {
          ...state,
          release_types: {
            ...state.release_types,
            types: [...state.release_types.types, id],
          },
        },
      });
    }
  };

  const handleToggleAdultSection = () => {
    dispatch({
      type: 'SET_FILTERS',
      payload: {
        ...state,
        adult: { ...state.adult, expanded: !state.adult.expanded },
      },
    });
  };

  const handleToggleRating = () => {
    dispatch({
      type: 'SET_FILTERS',
      payload: {
        ...state,
        rating: { ...state.rating, expanded: !state.rating.expanded },
      },
    });
  };

  const handleMinRating = (value: number) => {
    dispatch({
      type: 'SET_FILTERS',
      payload: {
        ...state,
        rating: { ...state.rating, min_rating: value },
      },
    });
  };

  const handleMaxRating = (value: number) => {
    dispatch({
      type: 'SET_FILTERS',
      payload: {
        ...state,
        rating: { ...state.rating, max_rating: value },
      },
    });
  };

  const handleToggleMinimumVotes = () => {
    dispatch({
      type: 'SET_FILTERS',
      payload: {
        ...state,
        vote_count: {
          ...state.vote_count,
          expanded: !state.vote_count.expanded,
        },
      },
    });
  };

  const handleVoteCount = (value: number) => {
    dispatch({
      type: 'SET_FILTERS',
      payload: {
        ...state,
        vote_count: { ...state.vote_count, count: value },
      },
    });
  };

  const handleAdult = (e: React.MouseEvent<HTMLDivElement>) => {
    dispatch({
      type: 'SET_FILTERS',
      payload: {
        ...state,
        adult: { ...state.adult, active: !state.adult.active },
      },
    });
  };

  const preventDefault = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return {
    handleToggleSortSection,
    handleToggleSortInput,
    handleSort,
    handleToggleDates,
    handleDateFrom,
    handleDateTo,
    handleToggleGenres,
    clearGenres,
    updateGenres,
    handleToggleCertificates,
    clearCertificates,
    updateCertificates,
    handleToggleReleaseTypes,
    clearTypes,
    updateTypes,
    handleToggleAdultSection,
    handleToggleRating,
    handleMinRating,
    handleMaxRating,
    handleToggleMinimumVotes,
    handleVoteCount,
    handleAdult,
    preventDefault,
  };
}
