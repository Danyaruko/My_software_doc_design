import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserDto } from 'src/dto/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as csvParser from 'csv-parser';
import * as fs from 'fs';
import { UserRepository } from './user.repository';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async readCSV() {
    try {
      const stream = fs
        .createReadStream('./src/csv/users.csv')
        .pipe(csvParser({ headers: true }));
      let headerSkipped = false;
      for await (const row of stream) {
        if (!headerSkipped) {
          headerSkipped = true;
          continue;
        }

        const user: User = {
          id: row['_0'],
          username: row['_1'],
          email: row['_2'],
          password: row['_3'],
        };

        await this.createUser(user);
      }
    } catch (err) {
      throw new Error(
        `An error occurred while reading CSV file: ${err.message}`,
      );
    }
  }

  async createUser(user: UserDto): Promise<User> {
    const { username, email, password } = user;
    console.log(user);

    const createdUser = await this.prisma.user.create({
      data: {
        username,
        email,
        password,
      },
      include: {
        playlists: true,
      },
    });
    return createdUser;
  }

  async getUsers(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async getUserById(id: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
  }

  async updateUser(id: string, User: UserDto): Promise<User> {
    const existingUser = await this.prisma.user.findUnique({
      where: { id: parseInt(id) },
      include: { playlists: true },
    });
    if (!existingUser) {
      throw new Error(`User with id ${id} not found`);
    }

    const updatedUser = { ...existingUser };
    updatedUser.username = User.username;
    updatedUser.email = User.email;
    updatedUser.password = User.password;

    const savedUser = await this.prisma.user.update({
      where: { id: existingUser.id },
      data: {
        username: User.username,
        email: User.email,
        password: User.password,
      },
      include: { playlists: true },
    });
    return savedUser;
  }

  async deleteUserById(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id: parseInt(id) },
    });
  }
}
