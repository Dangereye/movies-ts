export interface IPage<T> {
  id: number | undefined;
  page: number;
  total_pages: number;
  total_results: number;
  results: T[];
}
