import {
  Controller,
  Post,
  Body,
  Put,
  Delete,
  Param,
  Get,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from 'src/dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('users')
  async addUser(@Body() userDto: UserDto) {
    return await this.userService.addUser(userDto);
  }

  @Get('users')
  async getUsers() {
    return await this.userService.getUsers();
  }

  @Get('users/:id')
  async getUser(@Param('id') id: string) {
    return await this.userService.getUserById(id);
  }

  @Put('users/:id')
  async updateUser(@Param('id') id: string, @Body() dto: UserDto) {
    return await this.userService.updateUser(id, dto);
  }

  @Delete('users/:id')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }

  @Get('users/csv/read-csv')
  async readCsv() {
    return this.userService.readCsv();
  }
}
