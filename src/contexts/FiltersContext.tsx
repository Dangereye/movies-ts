import { useState, createContext, ReactNode, useReducer } from 'react';
import filtersReducer, {
  stateType,
  initialState,
  ActionType,
} from '../reducers/filtersReducer';

// type FiltersContextType = {
//   sort: string;
//   setSort: React.Dispatch<React.SetStateAction<string>>;
//   adult: boolean;
//   setAdult: React.Dispatch<React.SetStateAction<boolean>>;
//   dateFrom: string;
//   setDateFrom: React.Dispatch<React.SetStateAction<string>>;
//   dateTo: string;
//   setDateTo: React.Dispatch<React.SetStateAction<string>>;
//   genres: number[];
//   setGenres: React.Dispatch<React.SetStateAction<number[]>>;
//   types: number[];
//   setTypes: React.Dispatch<React.SetStateAction<number[]>>;
// };

type filtersContextType = {
  state: stateType;
  dispatch: React.Dispatch<ActionType>;
};

// export const FiltersContext = createContext({} as FiltersContextType);
export const FiltersContext = createContext({} as filtersContextType);

type FiltersContextProps = {
  children: ReactNode;
};

export default function FiltersContextComponent({
  children,
}: FiltersContextProps) {
  // const [sort, setSort] = useState<string>('popularity.desc');
  // const [adult, setAdult] = useState<boolean>(false);
  // const [dateFrom, setDateFrom] = useState<string>('');
  // const [dateTo, setDateTo] = useState<string>('');
  // const [genres, setGenres] = useState<number[]>([]);
  // const [types, setTypes] = useState<number[]>([]);
  const [state, dispatch] = useReducer(filtersReducer, initialState);
  return (
    <FiltersContext.Provider
      value={
        { state, dispatch }
        //   {
        //   sort,
        //   setSort,
        //   adult,
        //   setAdult,
        //   dateFrom,
        //   setDateFrom,
        //   dateTo,
        //   setDateTo,
        //   genres,
        //   setGenres,
        //   types,
        //   setTypes,
        // }
      }
    >
      {children}
    </FiltersContext.Provider>
  );
}
