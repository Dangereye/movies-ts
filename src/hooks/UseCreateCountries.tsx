import { ICountries } from '../interfaces/ICountries';
import useMakeQuery from './useMakeQuery';

export default function useCreateCountries() {
  let countries: ICountries[] = [];
  const { data, isError, isLoading } = useMakeQuery<ICountries[]>(
    `country-list`,
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
