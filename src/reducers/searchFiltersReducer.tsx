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
  adult: {
    expanded: boolean;
    active: boolean;
  };
};

export const initialState: stateType = {
  display: {
    expanded: true,
    show_media_type: 'movies',
    results: { movies: 0, tv_shows: 0, people: 0 },
  },
  adult: { expanded: false, active: false },
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
