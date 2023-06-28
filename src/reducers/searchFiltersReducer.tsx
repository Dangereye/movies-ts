export type stateType = {
  show_media_type: 'movies' | 'tv-shows' | 'people';
};

export const initialState: stateType = {
  show_media_type: 'movies',
};

export type actionType = {
  type: string;
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
