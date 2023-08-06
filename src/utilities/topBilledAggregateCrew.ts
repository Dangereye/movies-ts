import { IAggregateCrew } from "../interfaces/IAggregateCrew";

export const topBilledAggregateCrew = (data: IAggregateCrew[] | undefined) => {
    const topBilledCrew: IAggregateCrew[] = [];
    data?.forEach((person) => {
      const target = topBilledCrew.findIndex((index) => index.id === person.id);
      if (target !== -1) {
        topBilledCrew[target].jobs.push(...person.jobs);
      } else {
        topBilledCrew.push(person);
      }
    });
    return topBilledCrew;
  };