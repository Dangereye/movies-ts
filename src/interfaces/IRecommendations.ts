import { IRecommendation } from "./IRecommendation";

export interface IRecommendations {
  page: number;
  results: IRecommendation[];
  total_pages: number;
  total_results: number;
}
