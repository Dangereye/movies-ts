import { IImages } from '../interfaces/IImages';

export type stateType = {
  display: {
    expanded: boolean;
    show_media_type: 'posters' | 'backdrops' | 'logos';
    results: {
      posters: number | undefined;
      backdrops: number | undefined;
      logos: number | undefined;
    };
  };
  languages: {
    expanded: boolean;
    active_language: string;
    posters: {
      [key: string]: IImages[] | undefined;
    };
  };
};

export const initialState: stateType = {
  display: {
    expanded: true,
    show_media_type: 'posters',
    results: { posters: 0, backdrops: 0, logos: 0 },
  },
  languages: {
    expanded: true,
    active_language: 'en',
    posters: {},
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
