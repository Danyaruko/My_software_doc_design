import { Module } from '@nestjs/common';
import { PLAYLIST_REPOSITORY } from 'src/constants/constants';
import { PlaylistController } from './playlist.controller';
import { PrismaPlaylistRepository } from './playlist.PrismaRepository';
import { PlaylistService } from './playlist.service';

@Module({
  controllers: [PlaylistController],
  providers: [
    PlaylistService,
    {
      provide: PLAYLIST_REPOSITORY,
      useClass: PrismaPlaylistRepository,
    },
  ],
})
export class PlaylistModule {}
