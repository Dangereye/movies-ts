export type stateType = {
  sort: {
    expanded: boolean;
    inputExpanded: boolean;
    name: string;
    value: string | undefined;
  };
  adult: boolean;
  date_from: string;
  date_to: string;
  genres: number[];
  release_types: string[];
  region: string;
  vote_count: number;
};

export const initialState: stateType = {
  sort: {
    expanded: false,
    inputExpanded: false,
    name: 'Pupularity descended',
    value: 'popularity.desc',
  },
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
        sort: {
          ...state.sort,
          name: 'popularity descending',
          value: 'popularity.desc',
        },
        genres: [],
        release_types: ['flatrate', 'free', 'ads', 'rent', 'buy'],
        region: 'GB',
        date_from: '',
        date_to: '',
        vote_count: 50,
      };
    }
    case 'SET_DEFAULT_AIRING_TODAY': {
      const date = new Date(Date.now()).toISOString().split('T')[0];
      return {
        ...state,
        sort: {
          ...state.sort,
          name: 'popularity descending',
          value: 'popularity.desc',
        },
        genres: [],
        release_types: ['flatrate', 'free', 'ads', 'rent', 'buy'],
        region: 'GB',
        date_from: date,
        date_to: date,
        vote_count: 0,
      };
    }
    case 'SET_DEFAULT_NEXT_7_DAYS': {
      const from = new Date(Date.now()).toISOString().split('T')[0];
      const to = new Date(Date.now() + 6 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0];
      return {
        ...state,
        sort: {
          ...state.sort,
          name: 'popularity descending',
          value: 'popularity.desc',
        },
        genres: [],
        release_types: ['flatrate', 'free', 'ads', 'rent', 'buy'],
        region: 'GB',
        date_from: from,
        date_to: to,
        vote_count: 0,
      };
    }
    case 'SET_DEFAULT_TOP_RATED': {
      return {
        ...state,
        sort: {
          ...state.sort,
          name: 'Rating descending',
          value: 'vote_average.desc',
        },
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
