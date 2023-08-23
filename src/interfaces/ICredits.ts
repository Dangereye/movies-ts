// Interfaces
import { ICast } from "./ICast";
import { ICrew } from "./ICrew";

export interface ICredits {
  id: number;
  cast: ICast[];
  crew: ICrew[];
}
