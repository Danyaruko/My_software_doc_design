import { SingerModule } from './../singer/singer.module';
import { Injectable } from '@nestjs/common';
import { Song } from '@prisma/client';
import { SongDto } from 'src/dto/song.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as csvParser from 'csv-parser';
import * as fs from 'fs';
import { SongRepository } from './song.repository';

@Injectable()
export class PrismaSongRepository implements SongRepository {
  constructor(private readonly prisma: PrismaService) {}

  async readCSV() {
    try {
      const stream = fs
        .createReadStream('./src/csv/songs.csv')
        .pipe(csvParser({ headers: true }));
      let headerSkipped = false;
      for await (const row of stream) {
        if (!headerSkipped) {
          headerSkipped = true;
          continue;
        }

        const Song: Song = {
          id: row['_0'],
          name: row['_1'],
          genre: row['_2'],
          times_played: parseInt(row['_3']),
          duration_in_sec: parseInt(row['_4']),
        };

        const songDto: SongDto = {
          id: Song.id,
          name: Song.name,
          genre: Song.genre,
          times_played: Song.times_played,
          duration_in_sec: Song.duration_in_sec,
        };
        await this.createSong(songDto);
      }
    } catch (err) {
      throw new Error(
        `An error occurred while reading CSV file: ${err.message}`,
      );
    }
  }

  async createSong(song: SongDto): Promise<Song> {
    const { name, genre, times_played, duration_in_sec } = song;
    console.log(song);

    const createdSong = await this.prisma.song.create({
      data: {
        name,
        genre,
        times_played,
        duration_in_sec,
      },
      include: {
        singers: true,
        playlists: true,
      },
    });
    return createdSong;
  }

  async getSongs(): Promise<Song[]> {
    return await this.prisma.song.findMany();
  }

  async getSongById(id: string): Promise<Song | null> {
    return await this.prisma.song.findUnique({
      where: { id: parseInt(id) },
    });
  }

  async updateSong(id: string, song: SongDto): Promise<Song> {
    const existingSong = await this.prisma.song.findUnique({
      where: { id: parseInt(id) },
      include: { singers: true, playlists: true },
    });
    if (!existingSong) {
      throw new Error(`Song with id ${id} not found`);
    }

    const updatedSong = { ...existingSong };
    updatedSong.name = song.name;
    updatedSong.genre = song.genre;
    updatedSong.times_played = song.times_played;
    updatedSong.duration_in_sec = song.duration_in_sec;

    const savedSong = await this.prisma.song.update({
      where: { id: existingSong.id },
      data: {
        name: song.name,
        genre: song.genre,
        times_played: song.times_played,
        duration_in_sec: song.duration_in_sec,
      },
      include: { singers: true, playlists: true },
    });
    return savedSong;
  }

  async deleteSongById(id: string): Promise<void> {
    await this.prisma.song.delete({
      where: { id: parseInt(id) },
    });
  }
}
