import { ISimilar } from "./ISimilar";

export interface ISimilarMovies {
  page: number;
  results: ISimilar[];
  total_pages: number;
  total_results: number;
}
