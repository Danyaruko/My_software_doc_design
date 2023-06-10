import { Module } from '@nestjs/common';
import { SINGER_REPOSITORY } from 'src/constants/constants';
import { SingerController } from './singer.controller';
import { PrismaSingerRepository } from './singer.PrismaRepository';
import { SingerService } from './singer.service';

@Module({
  controllers: [SingerController],
  providers: [
    SingerService,
    {
      provide: SINGER_REPOSITORY,
      useClass: PrismaSingerRepository,
    },
  ],
})
export class SingerModule {}
