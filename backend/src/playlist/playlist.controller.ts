import {
  Controller,
  Post,
  Body,
  Put,
  Delete,
  Param,
  Get,
} from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistDto } from 'src/dto/playlist.dto';

@Controller('playlist')
export class PlaylistController {
  constructor(private playlistService: PlaylistService) {}

  @Post('playlists')
  async addPlaylist(@Body() playlistDto: PlaylistDto) {
    return await this.playlistService.addPlaylist(playlistDto);
  }

  @Get('playlists')
  async getPlaylists() {
    return await this.playlistService.getPlaylists();
  }

  @Get('playlists/:id')
  async getPlaylist(@Param('id') id: string) {
    return await this.playlistService.getPlaylistById(id);
  }

  @Put('playlists/:id')
  async updatePlaylist(@Param('id') id: string, @Body() dto: PlaylistDto) {
    return await this.playlistService.updatePlaylist(id, dto);
  }

  @Delete('playlists/:id')
  async deletePlaylist(@Param('id') id: string) {
    return await this.playlistService.deletePlaylist(id);
  }

  @Get('playlists/csv/read-csv')
  async readCsv() {
    return this.playlistService.readCsv();
  }
}
