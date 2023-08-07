export interface ITopBilledCrew {
  id: number;
  name: string;
  popularity: number;
  profile_path: string | null;
  jobs: { credit_id: string; job: string; episode_count?: number }[];
}
