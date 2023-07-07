// Hooks
import useMakeQuery from './useMakeQuery';

// Interfaces
import { ICountries } from '../interfaces/ICountries';

export default function useCreateCountries() {
  let countries: ICountries[] = [];
  const { data, isError, isLoading } = useMakeQuery<ICountries[]>(
    `countries`,
    `configuration/countries`
  );

  if (isLoading) {
    return [];
  }

  if (isError) {
    return [];
  }

  if (data) {
    countries = [...data];
  }

  return countries;
}
