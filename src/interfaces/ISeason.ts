// Interfaces
import { IAggregateCredits } from './IAggregateCredits';
import { ICredits } from './ICredits';
import { IEpisodes } from './IEpisodes';
import { IVideo } from './IVideo';

export interface ISeason {
  _id: string;
  air_date: string;
  episodes: IEpisodes[];
  name: string;
  overview: string;
  id: number;
  poster_path: string | null;
  season_number: number;
  credits: ICredits;
  aggregate_credits: IAggregateCredits;
  videos: {
    id: number;
    results: IVideo[];
  };
}
