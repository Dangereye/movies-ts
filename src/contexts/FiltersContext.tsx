import { useState, createContext, ReactNode } from 'react';

export const filtersContext = createContext({});

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
  const [genres, setGenres] = useState([]);
  return (
    <filtersContext.Provider
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
    </filtersContext.Provider>
  );
}
