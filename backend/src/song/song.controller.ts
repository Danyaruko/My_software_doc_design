import {
  Controller,
  Post,
  Body,
  Put,
  Delete,
  Param,
  Get,
} from '@nestjs/common';
import { SongService } from './song.service';
import { SongDto } from 'src/dto/song.dto';

@Controller('song')
export class SongController {
  constructor(private songService: SongService) {}

  @Post('songs')
  async addSong(@Body() songDto: SongDto) {
    return await this.songService.addSong(songDto);
  }

  @Get('songs')
  async getSongs() {
    return await this.songService.getSongs();
  }

  @Get('songs/:id')
  async getSong(@Param('id') id: string) {
    return await this.songService.getSongById(id);
  }

  @Put('songs/:id')
  async updateSong(@Param('id') id: string, @Body() dto: SongDto) {
    return await this.songService.updateSong(id, dto);
  }

  @Delete('songs/:id')
  async deleteSong(@Param('id') id: string) {
    return await this.songService.deleteSong(id);
  }

  @Get('songs/csv/read-csv')
  async readCsv() {
    return this.songService.readCsv();
  }
}
