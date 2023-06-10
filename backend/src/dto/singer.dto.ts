import { SongDto } from './song.dto';

export interface SingerDto {
  id: number;
  name: string;

  songs?: SongDto[];
}
