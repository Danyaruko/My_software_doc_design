import { Playlist } from '@prisma/client';
import { PlaylistDto } from 'src/dto/playlist.dto';

export interface PlaylistRepository {
  readCSV(): Promise<void>;
  createPlaylist(Playlist: PlaylistDto): Promise<Playlist>;
  getPlaylistById(id: string): Promise<Playlist | null>;
  getPlaylists(): Promise<Playlist[]>;
  updatePlaylist(id: string, Playlist: PlaylistDto): Promise<Playlist>;
  deletePlaylistById(id: string): Promise<void>;
}
