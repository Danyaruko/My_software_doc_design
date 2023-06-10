import { Inject, Injectable } from '@nestjs/common';
import { SONG_REPOSITORY } from 'src/constants/constants';
import { SongDto } from 'src/dto/song.dto';
import { SongRepository } from './song.repository';
import { Song } from '@prisma/client';

@Injectable()
export class SongService {
  constructor(
    @Inject(SONG_REPOSITORY) private readonly songRepository: SongRepository,
  ) {}

  async addSong(song: SongDto): Promise<Song> {
    return await this.songRepository.createSong(song);
  }

  async getSongs() {
    return await this.songRepository.getSongs();
  }

  async getSongById(id: string) {
    return await this.songRepository.getSongById(id);
  }

  async updateSong(id: string, song: SongDto) {
    return await this.songRepository.updateSong(id, song);
  }

  async deleteSong(id: string) {
    return await this.songRepository.deleteSongById(id);
  }

  async readCsv() {
    return await this.songRepository.readCSV();
  }

  async downloadApp() {}
}
