import { ICertification } from '../interfaces/ICertification';
import { ICertifications } from '../interfaces/ICertifications';

import useMakeQuery from './useMakeQuery';

export default function useCreateMovieCertifications() {
  let certificationList: string[] = [];

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
      certificationList = [...certificationList, c.certification];
    });
  }

  return certificationList;
}
