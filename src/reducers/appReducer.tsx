export type StateType = {
  mobile_menu: { active: boolean };
  mobile_filters_menu: { active: boolean };
  searchbar: { expanded: boolean };
  adult: { expanded: boolean; active: boolean };
  region: {
    expanded: boolean;
    inputExpanded: boolean;
    name: string;
    value: string | undefined;
  };
};

export const InitialState = {
  mobile_menu: { active: false },
  mobile_filters_menu: { active: false },
  searchbar: { expanded: false },
  adult: { expanded: false, active: false },
  region: {
    expanded: false,
    inputExpanded: false,
    name: 'United Kingdom',
    value: 'GB',
  },
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
