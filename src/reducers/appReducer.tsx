export type StateType = {
  searchbar: { expanded: boolean };
  adult: { expanded: boolean; active: boolean };
};

export const InitialState = {
  searchbar: { expanded: false },
  adult: { expanded: false, active: false },
};

export type ActionType = {
  type: 'test';

  payload: StateType;
};

export default function appReducer(state: StateType, action: ActionType) {
  const { type, payload } = action;
  switch (type) {
    case 'test': {
      return { ...payload };
    }
    default:
      return state;
  }
}
