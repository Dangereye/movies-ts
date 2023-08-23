// Interfaces
import { IPersonTvCast } from "./IPersonTvCast";
import { IPersonTvCrew } from "./IPersonTvCrew";

export interface IPersonTvCredits {
  id: number;
  cast: IPersonTvCast[];
  crew: IPersonTvCrew[];
}
