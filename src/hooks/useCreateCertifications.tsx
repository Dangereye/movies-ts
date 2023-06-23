// Interfaces
import { ICertifications } from '../interfaces/ICertifications';
import { ICertification } from '../interfaces/ICertification';

// Hooks
import useMakeQuery from './useMakeQuery';

export default function useCreateCertifications(key: string, endPoint: string) {
  let certifications: { name: string; order: number }[] = [];

  const { data, isError, isLoading } = useMakeQuery<
    ICertifications<ICertification>
  >(key, endPoint);

  if (isLoading) {
    return [];
  }

  if (isError) {
    return [];
  }

  if (data) {
    const key: keyof typeof data.certifications = 'GB';
    data.certifications[key].forEach((c) => {
      certifications = [
        ...certifications,
        { name: c.certification, order: c.order },
      ];
    });
  }

  return certifications;
}
