import { IPersonMovieCast } from "./IPersonMovieCast";

export interface IPersonMovieCredits {
  id: number;
  cast: IPersonMovieCast[];
  crew: {}[];
}
