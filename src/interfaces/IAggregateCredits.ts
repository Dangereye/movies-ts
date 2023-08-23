// Interfaces
import { IAggregateCrew } from "./IAggregateCrew";
import { IAggregateCast } from "./IAggregateCast";

export interface IAggregateCredits {
  id: number;
  cast: IAggregateCast[];
  crew: IAggregateCrew[];
}
