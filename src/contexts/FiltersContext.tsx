import { useState, createContext, ReactNode } from 'react';

type FiltersContextType = {
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  adult: boolean;
  setAdult: React.Dispatch<React.SetStateAction<boolean>>;
  dateFrom: string;
  setDateFrom: React.Dispatch<React.SetStateAction<string>>;
  dateTo: string;
  setDateTo: React.Dispatch<React.SetStateAction<string>>;
  genres: number[];
  setGenres: React.Dispatch<React.SetStateAction<number[]>>;
};

export const FiltersContext = createContext({} as FiltersContextType);

type FiltersContextProps = {
  children: ReactNode;
};

export default function FiltersContextComponent({
  children,
}: FiltersContextProps) {
  const [sort, setSort] = useState('popularity.desc');
  const [adult, setAdult] = useState(false);
  const [dateFrom, setDateFrom] = useState(''); // 2000-01-01
  const [dateTo, setDateTo] = useState('');
  const [genres, setGenres] = useState([
    28, 12, 16, 35, 80, 99, 18, 10751, 14, 36, 27, 10402, 9648, 10749, 878,
    10770, 53, 10752, 37,
  ]);
  return (
    <FiltersContext.Provider
      value={{
        sort,
        setSort,
        adult,
        setAdult,
        dateFrom,
        setDateFrom,
        dateTo,
        setDateTo,
        genres,
        setGenres,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
}
