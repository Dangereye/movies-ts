import { useState, useEffect } from "react";
import { IMovieReleaseDates } from "../../interfaces/IMovieReleaseDates";

type CertificateProps = {
  data: IMovieReleaseDates[] | undefined;
};

export default function Certificate({ data }: CertificateProps) {
  const [certificate, setCertificate] = useState<string | null>(null);

  useEffect(() => {
    if (data) {
      data.forEach((item) => {
        if (item.iso_3166_1 === "GB") {
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
  }, [data]);

  if (certificate) {
    return <div className="certificate">{certificate}</div>;
  }
  return null;
}
