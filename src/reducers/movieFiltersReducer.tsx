export type stateType = {
  sort: {
    expanded: boolean;
    inputExpanded: boolean;
    name: string;
    value: string | undefined;
  };
  providers: { expanded: boolean; ids: number[] };
  dates: {
    expanded: boolean;
    date_from: string;
    date_to: string;
  };
  genres: { expanded: boolean; types: number[] };
  release_types: { expanded: boolean; types: number[] };
  rating: { expanded: boolean; min_rating: number; max_rating: number };
  vote_count: { expanded: boolean; count: number };
  certifications: { expanded: boolean; certs: string[] };
};

export const initialState: stateType = {
  sort: {
    expanded: true,
    inputExpanded: false,
    name: 'popularity descending',
    value: 'popularity.desc',
  },
  providers: { expanded: false, ids: [] },
  dates: {
    expanded: false,
    date_to: '',
    date_from: '',
  },
  genres: { expanded: true, types: [] },
  release_types: { expanded: false, types: [] },
  rating: { expanded: false, min_rating: 0, max_rating: 10 },
  vote_count: { expanded: false, count: 0 },
  certifications: { expanded: true, certs: [] },
};

export type ActionType = {
  type:
    | 'SET_DEFAULT_POPULAR'
    | 'SET_DEFAULT_NOW_PLAYING'
    | 'SET_DEFAULT_TOP_RATED'
    | 'SET_DEFAULT_UPCOMING'
    | 'SET_DEFAULT_GENRE'
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
          ...state.sort,
          name: 'popularity descending',
          value: 'popularity.desc',
        },
        providers: { ...state.providers, ids: [] },
        genres: { ...state.genres, types: [] },
        release_types: { ...state.release_types, types: [] },
        dates: { ...state.dates, date_from: '', date_to: '' },
        rating: { ...state.rating, min_rating: 0, max_rating: 10 },
        vote_count: { ...state.vote_count, count: 0 },
        certifications: { ...state.certifications, certs: [] },
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
          ...state.sort,
          name: 'popularity descending',
          value: 'popularity.desc',
        },
        providers: { ...state.providers, ids: [] },
        genres: { ...state.genres, types: [] },
        release_types: { ...state.release_types, types: [2, 3] },
        dates: { ...state.dates, date_from: from, date_to: to },
        vote_count: { ...state.vote_count, count: 0 },
        certifications: { ...state.certifications, certs: [] },
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
          ...state.sort,
          name: 'popularity descending',
          value: 'popularity.desc',
        },
        providers: { ...state.providers, ids: [] },
        genres: { ...state.genres, types: [] },
        release_types: { ...state.release_types, types: [2, 3] },
        dates: { ...state.dates, date_from: from, date_to: to },
        vote_count: { ...state.vote_count, count: 0 },
        certifications: { ...state.certifications, certs: [] },
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
        release_types: { ...state.release_types, types: [] },
        dates: { ...state.dates, date_from: '', date_to: '' },
        vote_count: { ...state.vote_count, count: 300 },
        certifications: { ...state.certifications, certs: [] },
      };
    }

    case 'SET_DEFAULT_GENRE': {
      return {
        ...payload,
        sort: {
          ...state.sort,
          name: 'popularity descending',
          value: 'popularity.desc',
        },
        providers: { ...state.providers, ids: [] },
        release_types: { ...state.release_types, types: [] },
        dates: { ...state.dates, date_from: '', date_to: '' },
        rating: { ...state.rating, min_rating: 0, max_rating: 10 },
        vote_count: { ...state.vote_count, count: 0 },
        certifications: { ...state.certifications, certs: [] },
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
