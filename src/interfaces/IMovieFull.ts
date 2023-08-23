// Interfaces
import { IPage } from './IPage';
import { IMovieMin } from './IMovieMin';
import { ICredits } from './ICredits';
import { IVideos } from './IVideos';
import { IExternalIds } from './IExternalIds';
import { IReview } from './IReview';
import { IMovieReleaseDates } from './IMovieReleaseDates';
import { IImages } from './IImages';

export interface IMovieFull {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  } | null;
  budget: number;
  genres: { id: number; name: string }[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: {
    name: string;
    id: number;
    logo_path: string | null;
    origin_country: string;
  }[];
  production_countries: { iso_3166_1: string; name: string }[];
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: { iso_639_1: string; name: string }[];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  release_dates: {
    id: number;
    results: IMovieReleaseDates[];
  };
  credits: ICredits;
  videos: IVideos;
  external_ids: IExternalIds;
  recommendations: IPage<IMovieMin>;
  similar: IPage<IMovieMin>;
  reviews: IPage<IReview>;
  images: {
    id: number;
    backdrops: IImages[];
    logos: IImages[];
    posters: IImages[];
  };
}
