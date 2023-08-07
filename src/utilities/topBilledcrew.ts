// Interfaces
import { ICrew } from '../interfaces/ICrew';
import { ITopBilledCrew } from '../interfaces/ITopBilledCrew';

export const topBilledCrew = (data: ICrew[] | undefined) => {
  const topBilledCrew: ITopBilledCrew[] = [];
  if (data) {
    data.forEach((person) => {
      const target = topBilledCrew.findIndex((index) => index.id === person.id);
      if (target !== -1) {
        topBilledCrew[target].jobs.push({
          credit_id: person.credit_id,
          job: person.job,
        });
      } else {
        topBilledCrew.push({
          id: person.id,
          name: person.name,
          popularity: person.popularity,
          profile_path: person.profile_path,
          jobs: [{ credit_id: person.credit_id, job: person.job }],
        });
      }
    });
  }
  return topBilledCrew;
};
