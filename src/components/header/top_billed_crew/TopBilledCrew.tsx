// React router
import { Link } from 'react-router-dom';

// Components
import ImageComponent from '../../image/Image';
import HDiv from '../../typography/HDiv';
import SmallText from '../../typography/SmallText';

// Interfaces
import { ITopBilledCrew } from '../../../interfaces/ITopBilledCrew';

type TopBilledCastProps = {
  data: ITopBilledCrew[] | undefined;
};

export default function TopBilledCrew({ data }: TopBilledCastProps) {
  if (data) {
    return (
      <div className='top-billed-crew'>
        {data
          .sort((a, b) => b.popularity - a.popularity)
          .filter((person, i) => i < 8)
          .map((person) => (
            <Link
              key={person.id}
              className='crew-member'
              to={`/people/${person.id}`}
            >
              <div className='crew-member'>
                <ImageComponent
                  key={`image-${person.id}`}
                  base_url='https://image.tmdb.org/t/p/'
                  filename={person.profile_path}
                  profile_sizes='w185'
                  fallback='/images/error_100x100.webp'
                  width={75}
                  aspect_ratio='aspect-ratio-1-1'
                  alt={person.name}
                />
                <div className='crew-member__info'>
                  <HDiv heading={person.name} variant='heading--h4' />
                  <div className='crew-member__jobs'>
                    {person.jobs
                      .filter(
                        (value, index, array) => array.indexOf(value) === index
                      )
                      .map((job) => (
                        <SmallText key={job.credit_id} text={job.job} />
                      ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    );
  }

  return null;
}
