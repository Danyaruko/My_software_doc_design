import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/constants/constants';
import { UserDto } from 'src/dto/user.dto';
import { UserRepository } from './user.repository';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
  ) {}

  async addUser(User: UserDto): Promise<User> {
    return await this.userRepository.createUser(User);
  }

  async getUsers() {
    return await this.userRepository.getUsers();
  }

  async getUserById(id: string) {
    return await this.userRepository.getUserById(id);
  }

  async updateUser(id: string, User: UserDto) {
    return await this.userRepository.updateUser(id, User);
  }

  async deleteUser(id: string) {
    return await this.userRepository.deleteUserById(id);
  }

  async readCsv() {
    return await this.userRepository.readCSV();
  }

  async downloadApp() {}
}
