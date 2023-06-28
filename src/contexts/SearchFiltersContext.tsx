import { createContext, useReducer } from 'react';
import {
  initialState,
  stateType,
  actionType,
} from '../reducers/searchFiltersReducer';
import searchFiltersReducer from '../reducers/searchFiltersReducer';

type SearchFiltersContextType = {
  state: stateType;
  dispatch: React.Dispatch<actionType>;
};

export const SearchFiltersContext = createContext(
  {} as SearchFiltersContextType
);

type FiltersContextProps = {
  children: React.ReactNode;
};

export default function SearchFiltersContextComponent({
  children,
}: FiltersContextProps) {
  const [state, dispatch] = useReducer(searchFiltersReducer, initialState);
  return (
    <SearchFiltersContext.Provider value={{ state, dispatch }}>
      {children}
    </SearchFiltersContext.Provider>
  );
}
