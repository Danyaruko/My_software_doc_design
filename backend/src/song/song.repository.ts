import { Song } from '@prisma/client';
import { SongDto } from 'src/dto/song.dto';

export interface SongRepository {
  readCSV(): Promise<void>;
  createSong(Song: SongDto): Promise<Song>;
  getSongById(id: string): Promise<Song | null>;
  getSongs(): Promise<Song[]>;
  updateSong(id: string, Song: SongDto): Promise<Song>;
  deleteSongById(id: string): Promise<void>;
}
