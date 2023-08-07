// Interfaces
import { IAggregateCrew } from '../interfaces/IAggregateCrew';
import { ITopBilledCrew } from '../interfaces/ITopBilledCrew';

export const topBilledAggregateCrew = (data: IAggregateCrew[] | undefined) => {
  const topBilledCrew: ITopBilledCrew[] = [];
  data?.forEach((person) => {
    const target = topBilledCrew.findIndex((index) => index.id === person.id);
    if (target !== -1) {
      topBilledCrew[target].jobs.push(...person.jobs);
    } else {
      topBilledCrew.push({
        id: person.id,
        name: person.name,
        popularity: person.popularity,
        profile_path: person.profile_path,
        jobs: [...person.jobs],
      });
    }
  });
  return topBilledCrew; 
};
