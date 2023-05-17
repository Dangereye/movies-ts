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
  type: 'SET_STATE';
  payload: stateType;
};

export default function filtersReducer(state: stateType, action: ActionType) {
  const { type, payload } = action;
  switch (type) {
    case 'SET_STATE':
      console.log('Setting state', payload);
      return {
        ...payload,
      };
    default:
      return state;
  }
}
