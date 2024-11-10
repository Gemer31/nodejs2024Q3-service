import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import {
  CreateUserDto,
  UpdatePasswordDto,
  UserResponseDto,
} from '../dto/user.dto';
import { IdDto } from '../dto/common.dto';
import { StatusCodes } from 'http-status-codes';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAll() {
    const users = await this.userService.getAll();
    return users.map((user) => this.userService.getUserResponseDto(user));
  }

  @Get(':id')
  async get(@Param() { id }: IdDto) {
    const user = await this.userService.get(id);
    return this.userService.getUserResponseDto(user);
  }

  @Post()
  async create(@Body() body: CreateUserDto) {
    const user = await this.userService.create(body);
    return this.userService.getUserResponseDto(user);
  }

  @Put(':id')
  async update(
    @Param() { id }: IdDto,
    @Body() body: UpdatePasswordDto,
  ): Promise<UserResponseDto> {
    await this.userService.get(id);
    const user = await this.userService.updatePassword(id, body);
    return this.userService.getUserResponseDto(user);
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async delete(@Param() { id }: IdDto): Promise<string> {
    await this.userService.delete(id);
    return 'User deleted successfully';
  }
}
