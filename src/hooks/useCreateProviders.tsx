// Interfaces
import { useContext } from 'react';
import { IProviders } from '../interfaces/IProviders';

// Context
import { AppContext } from '../contexts/AppContext';

// Hooks
import useMakeQuery from './useMakeQuery';

export default function useCreateProviders(key: string, endpoint: string) {
  const { state } = useContext(AppContext);

  let providers: {
    display_priority: number;
    logo_path: string;
    provider_name: string;
    provider_id: number;
  }[] = [];

  const { data, isError, isLoading } = useMakeQuery<IProviders>(
    `${key}-${state.region.value}`,
    endpoint,
    `&watch_region=${state.region.value}`
  );

  if (isLoading) {
    return [];
  }

  if (isError) {
    return [];
  }

  data?.results.forEach((p) => {
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

  return providers;
}
