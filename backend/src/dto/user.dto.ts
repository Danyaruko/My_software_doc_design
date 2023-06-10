import { PlaylistDto } from './playlist.dto';

export interface UserDto {
  id: number;
  username: string;
  email: string;
  password: string;

  playlists?: PlaylistDto[];
}
