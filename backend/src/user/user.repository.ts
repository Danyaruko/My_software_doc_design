import { User } from '@prisma/client';
import { UserDto } from 'src/dto/user.dto';

export interface UserRepository {
  readCSV(): Promise<void>;
  createUser(User: UserDto): Promise<User>;
  getUserById(id: string): Promise<User | null>;
  getUsers(): Promise<User[]>;
  updateUser(id: string, User: UserDto): Promise<User>;
  deleteUserById(id: string): Promise<void>;
}
