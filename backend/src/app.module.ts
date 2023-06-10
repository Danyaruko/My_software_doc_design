import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { PlaylistModule } from './playlist/playlist.module';
import { SongModule } from './song/song.module';
import { SingerModule } from './singer/singer.module';

@Module({
  imports: [AuthModule, UserModule, PrismaModule, PlaylistModule, SongModule, SingerModule],
})
export class AppModule {}
