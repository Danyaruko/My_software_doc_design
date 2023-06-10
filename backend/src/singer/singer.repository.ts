import { Singer } from '@prisma/client';
import { SingerDto } from 'src/dto/singer.dto';

export interface SingerRepository {
  readCSV(): Promise<void>;
  createSinger(Singer: SingerDto): Promise<Singer>;
  getSingerById(id: string): Promise<Singer | null>;
  getSingers(): Promise<Singer[]>;
  updateSinger(id: string, Singer: SingerDto): Promise<Singer>;
  deleteSingerById(id: string): Promise<void>;
}
