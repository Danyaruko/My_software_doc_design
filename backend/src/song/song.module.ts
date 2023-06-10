import { Module } from '@nestjs/common';
import { SONG_REPOSITORY } from 'src/constants/constants';
import { SongController } from './song.controller';
import { PrismaSongRepository } from './song.PrismaRepository';
import { SongService } from './song.service';

@Module({
  controllers: [SongController],
  providers: [
    SongService,
    {
      provide: SONG_REPOSITORY,
      useClass: PrismaSongRepository,
    },
  ],
})
export class SongModule {}
