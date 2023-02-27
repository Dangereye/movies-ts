import { IEpisodes } from "./IEpisodes";

export interface ISeason {
  _id: string;
  air_date: string;
  episodes: IEpisodes[];
  name: string;
  overview: string;
  id: number;
  poster_path: string | null;
  season_number: number;
}
