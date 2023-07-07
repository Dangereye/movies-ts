// React
import { useContext } from 'react';

// Context
import { AppContext } from '../contexts/AppContext';

// Interfaces
import { ICertifications } from '../interfaces/ICertifications';
import { ICertification } from '../interfaces/ICertification';

// Hooks
import useMakeQuery from './useMakeQuery';

export default function useCreateCertifications(key: string, endPoint: string) {
  const { state } = useContext(AppContext);
  let certifications: { name: string; order: number }[] = [];

  const { data, isError, isLoading } = useMakeQuery<
    ICertifications<ICertification>
  >(`${key}-${state.region.value}`, endPoint);

  if (isLoading) {
    return [];
  }

  if (isError) {
    return [];
  }

  if (data) {
    const key: keyof typeof data.certifications = `${state.region.value}`;
    data.certifications[key]?.forEach((c) => {
      certifications = [
        ...certifications,
        { name: c.certification, order: c.order },
      ];
    });
  }

  return certifications;
}
