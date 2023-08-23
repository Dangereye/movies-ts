// React
import { useState, useEffect } from 'react';

// Interfaces
import { IMovieReleaseDates } from '../../interfaces/IMovieReleaseDates';
import { ITVShowContentRatings } from '../../interfaces/ITVShowContentRatings';

type CertificateProps = {
  movie?: IMovieReleaseDates[] | undefined;
  tv?: ITVShowContentRatings[] | undefined;
};

export default function Certificate({ movie, tv }: CertificateProps) {
  const [certificate, setCertificate] = useState<string | null>(null);

  useEffect(() => {
    if (movie) {
      movie.forEach((item) => {
        if (item.iso_3166_1 === 'GB') {
          item.release_dates.forEach((item) => {
            if (item.type === 3) {
              setCertificate(item.certification);
            }

            if (item.type === 4) {
              setCertificate(item.certification);
            }
          });
        }
      });
    }

    if (tv) {
      tv.forEach((item) => {
        if (item.iso_3166_1 === 'GB') {
          setCertificate(item.rating);
        }
      });
    }
  }, [movie, tv]);

  if (certificate) {
    return <div className='certificate'>{certificate}</div>;
  }
  return null;
}
