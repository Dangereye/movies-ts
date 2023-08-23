// Interfaces
import { ICombinedCredits } from "./ICombinedCredits";
import { IExternalIds } from "./IExternalIds";
import { IImages } from "./IImages";
import { IPersonMovieCredits } from "./IPersonMovieCredits";
import { IPersonTvCredits } from "./IPersonTvCredits";

export interface IPerson {
  birthday: string | null;
  known_for_department: string;
  deathday: string | null;
  id: number;
  name: string;
  also_known_as: string[];
  gender: number;
  biography: string;
  popularity: number;
  place_of_birth: string | null;
  profile_path: string | null;
  adult: boolean;
  imdb_id: string;
  homepage: string | null;
  combined_credits: ICombinedCredits;
  movie_credits: IPersonMovieCredits;
  tv_credits: IPersonTvCredits;
  external_ids: IExternalIds;
  images: {
    profiles: IImages[];
  };
}
