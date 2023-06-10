import {
  Controller,
  Post,
  Body,
  Put,
  Delete,
  Param,
  Get,
} from '@nestjs/common';
import { SingerService } from './singer.service';
import { SingerDto } from 'src/dto/singer.dto';

@Controller('singer')
export class SingerController {
  constructor(private singerService: SingerService) {}

  @Post('singers')
  async addSinger(@Body() singerDto: SingerDto) {
    return await this.singerService.addSinger(singerDto);
  }

  @Get('singers')
  async getSingers() {
    return await this.singerService.getSingers();
  }

  @Get('singers/:id')
  async getSinger(@Param('id') id: string) {
    return await this.singerService.getSingerById(id);
  }

  @Put('singers/:id')
  async updateSinger(@Param('id') id: string, @Body() dto: SingerDto) {
    return await this.singerService.updateSinger(id, dto);
  }

  @Delete('singers/:id')
  async deleteSinger(@Param('id') id: string) {
    return await this.singerService.deleteSinger(id);
  }

  @Get('singers/csv/read-csv')
  async readCsv() {
    return this.singerService.readCsv();
  }
}
