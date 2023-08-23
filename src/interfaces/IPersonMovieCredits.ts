// Interfaces
import { IPersonMovieCast } from "./IPersonMovieCast";
import { IPersonMovieCrew } from "./IPersonMovieCrew";

export interface IPersonMovieCredits {
  id: number;
  cast: IPersonMovieCast[];
  crew: IPersonMovieCrew[];
}
