import { Module } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/constants/constants';
import { UserController } from './user.controller';
import { PrismaUserRepository } from './user.PrismaRepository';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: USER_REPOSITORY,
      useClass: PrismaUserRepository,
    },
  ],
})
export class UserModule {}
