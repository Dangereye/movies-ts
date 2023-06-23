// Interfaces
import { IProviders } from '../interfaces/IProviders';

// Hooks
import useMakeQuery from './useMakeQuery';

export default function useCreateProviders(key: string, endpoint: string) {
  let providers: {
    display_priority: number;
    logo_path: string;
    provider_name: string;
    provider_id: number;
  }[] = [];

  const { data, isError, isLoading } = useMakeQuery<IProviders>(
    key,
    endpoint,
    `&watch_region=GB&language=en-GB`
  );

  if (isLoading) {
    return [];
  }

  if (isError) {
    return [];
  }

  if (data) {
    data.results.forEach((p) => {
      providers = [
        ...providers,
        {
          display_priority: p.display_priority,
          logo_path: p.logo_path,
          provider_name: p.provider_name,
          provider_id: p.provider_id,
        },
      ];
    });
  }

  return providers;
}
