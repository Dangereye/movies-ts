import { ICertifications } from '../interfaces/ICertifications';
import { ICertification } from '../interfaces/ICertification';
import useMakeQuery from './useMakeQuery';

export default function useCreateMovieCertifications() {
  let certificationList: string[] = [];

  const {
    data: certifications,
    isError,
    isLoading,
  } = useMakeQuery<ICertifications<ICertification>>(
    `certification-list`,
    `certification/movie/list`
  );

  if (isLoading) {
    return [];
  }

  if (isError) {
    return [];
  }

  certifications?.GB?.forEach((c) => {
    certificationList = [...certificationList, c.certification];
  });

  return certificationList;
}
