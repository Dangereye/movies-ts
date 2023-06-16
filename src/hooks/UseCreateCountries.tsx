import { ICountries } from '../interfaces/ICountries';
import useMakeQuery from './useMakeQuery';

export default function useCreateCountries() {
  const {
    data: countries,
    isError,
    isLoading,
  } = useMakeQuery<ICountries>(`country-list`, `configuration/countries`);

  if (isLoading) {
    return [];
  }

  if (isError) {
    return [];
  }

  return { countries };
}
