export type stateType = {
  display: {
    expanded: boolean;
    show_media_type: 'movies' | 'tv-shows' | 'people';
    results: {
      movies: number | undefined;
      tv_shows: number | undefined;
      people: number | undefined;
    };
  };
};

export const initialState: stateType = {
  display: {
    expanded: true,
    show_media_type: 'movies',
    results: { movies: 1, tv_shows: 1, people: 1 },
  },
};

export type actionType = {
  type: 'SET_FILTERS';
  payload: stateType;
};

export default function searchFiltersReducer(
  state: stateType,
  action: actionType
) {
  const { type, payload } = action;
  switch (type) {
    case 'SET_FILTERS': {
      return {
        ...state,
        ...payload,
      };
    }
    default: {
      return state;
    }
  }
}
