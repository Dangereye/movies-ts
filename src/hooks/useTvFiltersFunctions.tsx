// React
import { useContext } from 'react';

// Context
import { TvFiltersContext } from '../contexts/TvFiltersContext';
import { AppContext } from '../contexts/AppContext';

export default function useTvFiltersFunctions() {
  const { state: appState, dispatch: appDispatch } = useContext(AppContext);
  const { state, dispatch } = useContext(TvFiltersContext);

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

  const handleToggleProviders = () => {
    dispatch({
      type: 'SET_FILTERS',
      payload: {
        ...state,
        providers: { ...state.providers, expanded: !state.providers.expanded },
      },
    });
  };

  const clearProviders = () => {
    dispatch({
      type: 'SET_FILTERS',
      payload: { ...state, providers: { ...state.providers, ids: [] } },
    });
  };

  const updateProviders = (id: number) => {
    if (state?.providers?.ids.includes(id)) {
      dispatch({
        type: 'SET_FILTERS',
        payload: {
          ...state,
          providers: {
            ...state.providers,
            ids: state.providers.ids.filter((p) => p !== id),
          },
        },
      });
    } else {
      dispatch({
        type: 'SET_FILTERS',
        payload: {
          ...state,
          providers: {
            ...state.providers,
            ids: [...state.providers.ids, id],
          },
        },
      });
    }
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

  const updateTypes = (id: string) => {
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

  const handleToggleAdultSection = () => {
    appDispatch({
      type: 'UPDATE_APP',
      payload: {
        ...appState,
        adult: { ...appState.adult, expanded: !appState.adult.expanded },
      },
    });
  };

  const handleAdult = (e: React.MouseEvent<HTMLDivElement>) => {
    appDispatch({
      type: 'UPDATE_APP',
      payload: {
        ...appState,
        adult: { ...appState.adult, active: !appState.adult.active },
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
    handleToggleProviders,
    clearProviders,
    updateProviders,
    handleToggleGenres,
    clearGenres,
    updateGenres,
    handleToggleDates,
    handleDateFrom,
    handleDateTo,
    handleToggleReleaseTypes,
    clearTypes,
    updateTypes,
    handleToggleRating,
    handleMinRating,
    handleMaxRating,
    handleToggleMinimumVotes,
    handleVoteCount,
    handleToggleAdultSection,
    handleAdult,
    preventDefault,
  };
}
