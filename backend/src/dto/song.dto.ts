import { SingerDto } from './singer.dto';

export interface SongDto {
  id: number;
  name: string;
  genre: string;
  times_played: number;
  duration_in_sec: number;

  singers?: SingerDto[];
}
