export type stateType = {
  sort: {
    expanded: boolean;
    inputExpanded: boolean;
    name: string;
    value: string | undefined;
  };
  providers: { expanded: boolean; ids: number[] };
  adult: boolean;
  dates: {
    expanded: boolean;
    date_from: string;
    date_to: string;
  };
  genres: { expanded: boolean; types: number[] };
  release_types: { expanded: boolean; types: string[] };
  rating: { expanded: boolean; min_rating: number; max_rating: number };
  region: string;
  vote_count: { expanded: boolean; count: number };
};

export const initialState: stateType = {
  sort: {
    expanded: false,
    inputExpanded: false,
    name: 'Pupularity descended',
    value: 'popularity.desc',
  },
  providers: { expanded: false, ids: [] },
  adult: false,
  dates: {
    expanded: false,
    date_to: '',
    date_from: '',
  },
  genres: { expanded: false, types: [] },
  release_types: {
    expanded: false,
    types: ['flatrate', 'free', 'ads', 'rent', 'buy'],
  },
  rating: { expanded: false, min_rating: 0, max_rating: 10 },
  region: 'GB',
  vote_count: { expanded: false, count: 0 },
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
        providers: { ...state.providers, ids: [] },
        genres: { ...state.genres, types: [] },
        release_types: {
          ...state.release_types,
          types: ['flatrate', 'free', 'ads', 'rent', 'buy'],
        },
        rating: { ...state.rating, min_rating: 0, max_rating: 10 },
        region: 'GB',
        dates: { ...state.dates, date_from: '', date_to: '' },
        vote_count: { ...state.vote_count, count: 0 },
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
        providers: { ...state.providers, ids: [] },
        genres: { ...state.genres, types: [] },
        release_types: {
          ...state.release_types,
          types: ['flatrate', 'free', 'ads', 'rent', 'buy'],
        },
        rating: { ...state.rating, min_rating: 0, max_rating: 10 },
        region: 'GB',
        dates: { ...state.dates, date_from: date, date_to: date },
        vote_count: { ...state.vote_count, count: 0 },
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
        providers: { ...state.providers, ids: [] },
        genres: { ...state.genres, types: [] },
        release_types: {
          ...state.release_types,
          types: ['flatrate', 'free', 'ads', 'rent', 'buy'],
        },
        rating: { ...state.rating, min_rating: 0, max_rating: 10 },
        region: 'GB',
        dates: { ...state.dates, date_from: from, date_to: to },
        vote_count: { ...state.vote_count, count: 0 },
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
        providers: { ...state.providers, ids: [] },
        genres: { ...state.genres, types: [] },
        release_types: {
          ...state.release_types,
          types: ['flatrate', 'free', 'ads', 'rent', 'buy'],
        },
        rating: { ...state.rating, min_rating: 0, max_rating: 10 },
        region: 'GB',
        dates: { ...state.dates, date_from: '', date_to: '' },
        vote_count: { ...state.vote_count, count: 100 },
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
