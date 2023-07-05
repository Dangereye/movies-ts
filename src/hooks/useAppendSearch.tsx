import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

export default function useAppendSearch() {
  const { state } = useContext(AppContext);
  const append = `&region=GB&language=en-GB&include_adult=${state.adult.active}`;

  return append;
}
