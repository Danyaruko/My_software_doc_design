import { PrismaClient } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { url } from 'inspector';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: 'postgresql://danylo:123@localhost:5434/test?schema=public',
        },
      },
    });
  }
}
