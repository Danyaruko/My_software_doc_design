import { Inject, Injectable } from '@nestjs/common';
import { SINGER_REPOSITORY } from 'src/constants/constants';
import { SingerDto } from 'src/dto/singer.dto';
import { SingerRepository } from './singer.repository';
import { Singer } from '@prisma/client';

@Injectable()
export class SingerService {
  constructor(
    @Inject(SINGER_REPOSITORY)
    private readonly singerRepository: SingerRepository,
  ) {}

  async addSinger(singer: SingerDto): Promise<Singer> {
    return await this.singerRepository.createSinger(singer);
  }

  async getSingers() {
    return await this.singerRepository.getSingers();
  }

  async getSingerById(id: string) {
    return await this.singerRepository.getSingerById(id);
  }

  async updateSinger(id: string, singer: SingerDto) {
    return await this.singerRepository.updateSinger(id, singer);
  }

  async deleteSinger(id: string) {
    return await this.singerRepository.deleteSingerById(id);
  }

  async readCsv() {
    return await this.singerRepository.readCSV();
  }

  async downloadApp() {}
}
