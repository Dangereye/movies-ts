import { createContext, ReactNode, useReducer } from 'react';
import tvFiltersReducer, {
  stateType,
  initialState,
  ActionType,
} from '../reducers/tvFiltersReducer';

type TvFiltersContextType = {
  state: stateType;
  dispatch: React.Dispatch<ActionType>;
};

export const TvFiltersContext = createContext({} as TvFiltersContextType);

type FiltersContextProps = {
  children: ReactNode;
};

export default function TvFiltersContextComponent({
  children,
}: FiltersContextProps) {
  const [state, dispatch] = useReducer(tvFiltersReducer, initialState);
  // console.log('TV Filters: ', state);
  return (
    <TvFiltersContext.Provider value={{ state, dispatch }}>
      {children}
    </TvFiltersContext.Provider>
  );
}
