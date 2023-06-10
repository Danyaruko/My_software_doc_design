import { SongDto } from './song.dto';

export interface PlaylistDto {
  id: number;
  name: string;
  times_played: number;

  songs?: SongDto[];

  owner_id: number;
}
