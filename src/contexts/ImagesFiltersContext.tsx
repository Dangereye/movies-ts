// React
import { createContext, useReducer } from 'react';

// Reducers
import {
  initialState,
  stateType,
  actionType,
} from '../reducers/imagesFiltersReducer';
import imagesFiltersReducer from '../reducers/imagesFiltersReducer';

type ImagesFiltersContextType = {
  state: stateType;
  dispatch: React.Dispatch<actionType>;
};

export const ImagesFiltersContext = createContext(
  {} as ImagesFiltersContextType
);

type FiltersContextProps = {
  children: React.ReactNode;
};

export default function ImagesFiltersContextComponent({
  children,
}: FiltersContextProps) {
  const [state, dispatch] = useReducer(imagesFiltersReducer, initialState);
  return (
    <ImagesFiltersContext.Provider value={{ state, dispatch }}>
      {children}
    </ImagesFiltersContext.Provider>
  );
}
