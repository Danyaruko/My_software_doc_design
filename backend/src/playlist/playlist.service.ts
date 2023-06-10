import { Inject, Injectable } from '@nestjs/common';
import { PLAYLIST_REPOSITORY } from 'src/constants/constants';
import { PlaylistDto } from 'src/dto/playlist.dto';
import { PlaylistRepository } from './playlist.repository';
import { Playlist } from '@prisma/client';

@Injectable()
export class PlaylistService {
  constructor(
    @Inject(PLAYLIST_REPOSITORY)
    private readonly playlistRepository: PlaylistRepository,
  ) {}

  async addPlaylist(playlist: PlaylistDto): Promise<Playlist> {
    return await this.playlistRepository.createPlaylist(playlist);
  }

  async getPlaylists() {
    return await this.playlistRepository.getPlaylists();
  }

  async getPlaylistById(id: string) {
    return await this.playlistRepository.getPlaylistById(id);
  }

  async updatePlaylist(id: string, playlist: PlaylistDto) {
    return await this.playlistRepository.updatePlaylist(id, playlist);
  }

  async deletePlaylist(id: string) {
    return await this.playlistRepository.deletePlaylistById(id);
  }

  async readCsv() {
    return await this.playlistRepository.readCSV();
  }

  async downloadApp() {}
}
