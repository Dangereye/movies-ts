// Hooks
import useMakeQuery from './useMakeQuery';

// Interfaces
import { ILanguages } from '../interfaces/Ilanguages';

export default function useCreateCountries() {
  let languages: ILanguages[] = [];
  const { data, isError, isLoading } = useMakeQuery<ILanguages[]>(
    `languages`,
    `configuration/languages`
  );

  if (isLoading) {
    return [];
  }

  if (isError) {
    return [];
  }

  if (data) {
    languages = [...data];
  }

  return languages;
}
