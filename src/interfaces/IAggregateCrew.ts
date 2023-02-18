export interface IAggregateCrew {
  adult: boolean;
  gender: number | null;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  jobs: { credit_id: string; job: string; episode_count: number }[];
  department: string;
  total_episode_count: number;
}
