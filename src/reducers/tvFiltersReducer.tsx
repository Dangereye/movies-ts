export type stateType = {
  sort: string;
  adult: boolean;
  date_from: string;
  date_to: string;
  genres: number[];
  release_types: string[];
  region: string;
  vote_count: number;
};

export const initialState: stateType = {
  sort: 'popularity.desc',
  adult: false,
  date_from: '',
  date_to: '',
  genres: [],
  release_types: ['flatrate', 'free', 'ads', 'rent', 'buy'],
  region: 'GB',
  vote_count: 0,
};

export type ActionType = {
  type:
    | 'SET_DEFAULT_POPULAR'
    | 'SET_DEFAULT_AIRING_TODAY'
    | 'SET_DEFAULT_NEXT_7_DAYS'
    | 'SET_DEFAULT_TOP_RATED'
    | 'SET_FILTERS';
  payload: stateType;
};

export default function tvFiltersReducer(state: stateType, action: ActionType) {
  const { type, payload } = action;
  switch (type) {
    case 'SET_DEFAULT_POPULAR': {
      return {
        ...state,
        sort: 'popularity.desc',
        genres: [],
        release_types: ['flatrate', 'free', 'ads', 'rent', 'buy'],
        region: 'GB',
        date_from: '',
        date_to: '',
        vote_count: 100,
      };
    }
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
