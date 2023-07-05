export type StateType = {
  searchbar: { expanded: boolean };
  adult: { expanded: boolean; active: boolean };
};

export const InitialState = {
  searchbar: { expanded: false },
  adult: { expanded: false, active: false },
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
