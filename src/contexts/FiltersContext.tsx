import { createContext, ReactNode, useReducer } from 'react';
import filtersReducer, {
  stateType,
  initialState,
  ActionType,
} from '../reducers/filtersReducer';

type filtersContextType = {
  state: stateType;
  dispatch: React.Dispatch<ActionType>;
};

export const FiltersContext = createContext({} as filtersContextType);

type FiltersContextProps = {
  children: ReactNode;
};

export default function FiltersContextComponent({
  children,
}: FiltersContextProps) {
  const [state, dispatch] = useReducer(filtersReducer, initialState);
  return (
    <FiltersContext.Provider value={{ state, dispatch }}>
      {children}
    </FiltersContext.Provider>
  );
}
