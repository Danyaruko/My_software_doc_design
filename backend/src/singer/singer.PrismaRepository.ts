import { Injectable } from '@nestjs/common';
import { Singer } from '@prisma/client';
import { SingerDto } from 'src/dto/singer.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as csvParser from 'csv-parser';
import * as fs from 'fs';
import { SingerRepository } from './singer.repository';

@Injectable()
export class PrismaSingerRepository implements SingerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async readCSV() {
    try {
      const stream = fs
        .createReadStream('./src/csv/singers.csv')
        .pipe(csvParser({ headers: true }));
      let headerSkipped = false;
      for await (const row of stream) {
        if (!headerSkipped) {
          headerSkipped = true;
          continue;
        }

        const Singer: Singer = {
          id: row['_0'],
          name: row['_1'],
        };

        const SingerDto: SingerDto = {
          id: Singer.id,
          name: Singer.name,
        };
        await this.createSinger(SingerDto);
      }
    } catch (err) {
      throw new Error(
        `An error occurred while reading CSV file: ${err.message}`,
      );
    }
  }

  async createSinger(Singer: SingerDto): Promise<Singer> {
    const { name } = Singer;
    console.log(Singer);

    const createdSinger = await this.prisma.singer.create({
      data: {
        name,
      },
      include: {
        songs: true,
      },
    });
    return createdSinger;
  }

  async getSingers(): Promise<Singer[]> {
    return await this.prisma.singer.findMany();
  }

  async getSingerById(id: string): Promise<Singer | null> {
    return await this.prisma.singer.findUnique({
      where: { id: parseInt(id) },
    });
  }

  async updateSinger(id: string, Singer: SingerDto): Promise<Singer> {
    const existingSinger = await this.prisma.singer.findUnique({
      where: { id: parseInt(id) },
      include: { songs: true },
    });
    if (!existingSinger) {
      throw new Error(`Singer with id ${id} not found`);
    }

    const updatedSinger = { ...existingSinger };
    updatedSinger.name = Singer.name;

    const savedSinger = await this.prisma.singer.update({
      where: { id: existingSinger.id },
      data: { name: Singer.name },
      include: { songs: true},
    });
    return savedSinger;
  }

  async deleteSingerById(id: string): Promise<void> {
    await this.prisma.singer.delete({
      where: { id: parseInt(id) },
    });
  }
}
