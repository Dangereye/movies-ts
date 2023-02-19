import { IPersonTvCast } from "./IPersonTvCast";

export interface IPersonTvCredits {
  id: number;
  cast: IPersonTvCast[];
  crew: {}[];
}
