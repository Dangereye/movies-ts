import { IImages } from '../interfaces/IImages';

export type stateType = {
  display: {
    expanded: boolean;
    show_media_type: 'posters' | 'backdrops';
    results: {
      posters: number | undefined;
      backdrops: number | undefined;
    };
  };
  languages: {
    expanded: boolean;
    active_language: string;
    posters: {
      [key: string]: IImages[] | undefined;
    };
    backdrops: {
      [key: string]: IImages[] | undefined;
    };
  };
  modal: {
    is_active: boolean;
    index: number;
  };
};

export const initialState: stateType = {
  display: {
    expanded: true,
    show_media_type: 'posters',
    results: { posters: 0, backdrops: 0 },
  },
  languages: {
    expanded: true,
    active_language: 'en',
    posters: {},
    backdrops: {},
  },
  modal: {
    is_active: false,
    index: 0,
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
