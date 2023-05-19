export type stateType = {
  sort: string;
  adult: boolean;
  date_from: string;
  date_to: string;
  genres: number[];
  release_types: number[];
  end_point: string;
};

export const initialState: stateType = {
  sort: 'popularity.desc',
  adult: false,
  date_from: '',
  date_to: '',
  genres: [],
  release_types: [],
  end_point: '',
};

export type ActionType = {
  type: 'SET_DEFAULT_POPULAR' | 'SET_DEFAULT_NOW_PLAYING' | 'SET_FILTERS';
  payload: stateType;
};

export default function filtersReducer(state: stateType, action: ActionType) {
  const { type, payload } = action;
  switch (type) {
    case 'SET_DEFAULT_POPULAR':
      console.log('Popular defaults', state);
      return {
        ...state,
        sort: 'popularity.desc',
        genres: [],
        release_types: [],
        date_from: '',
        date_to: '',
      };
    case 'SET_DEFAULT_NOW_PLAYING':
      if (!state.release_types.length) {
        console.log('Now playing defaults', state);
        const from = new Date(Date.now() - 12096e5).toISOString().split('T')[0];
        const to = new Date(Date.now() + 12096e5).toISOString().split('T')[0];
        return {
          ...state,
          genres: [],
          release_types: [2, 3],
          date_from: from,
          date_to: to,
        };
      }
      return state;
    case 'SET_FILTERS':
      console.log('Setting filters', state);
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
}
