// Interfaces
import { ICertifications } from '../interfaces/ICertifications';
import { ICertification } from '../interfaces/ICertification';

// Hooks
import useMakeQuery from './useMakeQuery';

export default function useCreateMovieCertifications() {
  let certificationList: { name: string; order: number }[] = [];

  const { data, isError, isLoading } = useMakeQuery<
    ICertifications<ICertification>
  >(`certification-list`, `certification/movie/list`);

  if (isLoading) {
    return [];
  }

  if (isError) {
    return [];
  }

  if (data) {
    const key: keyof typeof data.certifications = 'GB';
    data.certifications[key].forEach((c) => {
      certificationList = [
        ...certificationList,
        { name: c.certification, order: c.order },
      ];
    });
  }

  return certificationList;
}
