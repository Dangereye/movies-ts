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
  release_types: number[];
  vote_count: number;
};

export const initialState: stateType = {
  sort: {
    expanded: false,
    inputExpanded: false,
    name: 'popularity descending',
    value: 'popularity.desc',
  },
  adult: false,
  date_from: '',
  date_to: '',
  genres: [],
  release_types: [],
  vote_count: 0,
};

export type ActionType = {
  type:
    | 'SET_DEFAULT_POPULAR'
    | 'SET_DEFAULT_NOW_PLAYING'
    | 'SET_DEFAULT_TOP_RATED'
    | 'SET_DEFAULT_UPCOMING'
    | 'SET_FILTERS';
  payload: stateType;
};

export default function movieFiltersReducer(
  state: stateType,
  action: ActionType
) {
  const { type, payload } = action;
  switch (type) {
    case 'SET_DEFAULT_POPULAR': {
      return {
        ...state,
        sort: {
          expanded: state.sort.expanded,
          inputExpanded: state.sort.inputExpanded,
          name: 'popularity descending',
          value: 'popularity.desc',
        },
        genres: [],
        release_types: [],
        date_from: '',
        date_to: '',
        vote_count: 300,
      };
    }
    case 'SET_DEFAULT_NOW_PLAYING': {
      const from = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0];
      const to = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0];
      return {
        ...state,
        sort: {
          expanded: state.sort.expanded,
          inputExpanded: state.sort.inputExpanded,
          name: 'popularity descending',
          value: 'popularity.desc',
        },
        genres: [],
        release_types: [2, 3],
        date_from: from,
        date_to: to,
        vote_count: 0,
      };
    }

    case 'SET_DEFAULT_TOP_RATED': {
      return {
        ...state,
        sort: {
          expanded: state.sort.expanded,
          inputExpanded: state.sort.inputExpanded,
          name: 'Rating descending',
          value: 'vote_average.desc',
        },
        genres: [],
        release_types: [],
        date_from: '',
        date_to: '',
        vote_count: 300,
      };
    }
    case 'SET_DEFAULT_UPCOMING': {
      const from = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0];
      const to = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0];
      return {
        ...state,
        sort: {
          expanded: state.sort.expanded,
          inputExpanded: state.sort.inputExpanded,
          name: 'popularity descending',
          value: 'popularity.desc',
        },
        genres: [],
        release_types: [2, 3],
        date_from: from,
        date_to: to,
        vote_count: 0,
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
