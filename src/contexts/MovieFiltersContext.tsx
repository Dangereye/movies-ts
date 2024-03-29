// React
import { createContext, ReactNode, useReducer } from 'react';

// Reducers
import moviefiltersReducer, {
  stateType,
  initialState,
  ActionType,
} from '../reducers/movieFiltersReducer';

type MovieFiltersContextType = {
  state: stateType;
  dispatch: React.Dispatch<ActionType>;
};

export const MovieFiltersContext = createContext({} as MovieFiltersContextType);

type FiltersContextProps = {
  children: ReactNode;
};

export default function MovieFiltersContextComponent({
  children,
}: FiltersContextProps) {
  const [state, dispatch] = useReducer(moviefiltersReducer, initialState);
  return (
    <MovieFiltersContext.Provider value={{ state, dispatch }}>
      {children}
    </MovieFiltersContext.Provider>
  );
}
