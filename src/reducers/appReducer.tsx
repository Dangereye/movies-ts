export type StateType = {
  searchbar: { expanded: boolean };
  adult: { expanded: boolean; active: boolean };
  region: string;
};

export const InitialState = {
  searchbar: { expanded: false },
  adult: { expanded: false, active: false },
  region: 'GB',
};

export type ActionType = {
  type: 'UPDATE_APP';
  payload: StateType;
};

export default function appReducer(state: StateType, action: ActionType) {
  const { type, payload } = action;
  switch (type) {
    case 'UPDATE_APP': {
      return { ...payload };
    }
    default:
      return state;
  }
}
