import { PlaylistRepository } from './playlist.repository';
import { Injectable } from '@nestjs/common';
import { Playlist } from '@prisma/client';
import { PlaylistDto } from 'src/dto/playlist.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as csvParser from 'csv-parser';
import * as fs from 'fs';

@Injectable()
export class PrismaPlaylistRepository implements PlaylistRepository {
  constructor(private readonly prisma: PrismaService) {}

  async readCSV() {
    try {
      const stream = fs
        .createReadStream('./src/csv/playlists.csv')
        .pipe(csvParser({ headers: true }));
      let headerSkipped = false;
      for await (const row of stream) {
        if (!headerSkipped) {
          headerSkipped = true;
          continue;
        }

        const Playlist: Playlist = {
          id: row['_0'],
          name: row['_1'],
          times_played: parseInt(row['_2']),
          owner_id: parseInt(row['_3']),
        };
        const owner_id = await this.prisma.user.findUnique({
          where: { id: Playlist.owner_id },
        });

        const PlaylistDto: PlaylistDto = {
          id: Playlist.id,
          name: Playlist.name,
          times_played: Playlist.times_played,
          owner_id: owner_id.id,
        };
        await this.createPlaylist(PlaylistDto);
      }
    } catch (err) {
      throw new Error(
        `An error occurred while reading CSV file: ${err.message}`,
      );
    }
  }

  async createPlaylist(Playlist: PlaylistDto): Promise<Playlist> {
    const { name, times_played, owner_id } = Playlist;
    console.log(Playlist);

    const owner_idExists = await this.prisma.user.findUnique({
      where: { id: owner_id },
    });

    if (!owner_idExists) {
      throw new Error(`User with id ${owner_id} not found`);
    }

    const createdPlaylist = await this.prisma.playlist.create({
      data: {
        name,
        times_played,
        owner_id,
      },
    });
    return createdPlaylist;
  }

  async getPlaylists(): Promise<Playlist[]> {
    return await this.prisma.playlist.findMany();
  }

  async getPlaylistById(id: string): Promise<Playlist | null> {
    return await this.prisma.playlist.findUnique({
      where: { id: parseInt(id) },
    });
  }

  async updatePlaylist(id: string, Playlist: PlaylistDto): Promise<Playlist> {
    const existingPlaylist = await this.prisma.playlist.findUnique({
      where: { id: parseInt(id) },
    });
    if (!existingPlaylist) {
      throw new Error(`Playlist with id ${id} not found`);
    }

    const updatedPlaylist = { ...existingPlaylist };
    updatedPlaylist.name = Playlist.name;
    updatedPlaylist.times_played = Playlist.times_played;
    updatedPlaylist.owner_id = Playlist.owner_id;

    const savedPlaylist = await this.prisma.playlist.update({
      where: { id: existingPlaylist.id },
      data: {
        name: Playlist.name,
        times_played: Playlist.times_played,
        owner_id: Playlist.owner_id,
      },
    });
    return savedPlaylist;
  }

  async deletePlaylistById(id: string): Promise<void> {
    await this.prisma.playlist.delete({
      where: { id: parseInt(id) },
    });
  }
}
