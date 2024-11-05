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
import { CreateUserDto, UpdatePasswordDto, User } from '../dto/user.dto';
import { IdDto } from '../dto/common.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  async get(@Param() { id }: IdDto): Promise<User> {
    return this.userService.get(id);
  }

  @Post()
  create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Put(':id')
  update(
    @Param() { id }: IdDto,
    @Body() body: UpdatePasswordDto,
  ): Promise<User> {
    return this.userService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param() { id }: IdDto): Promise<string> {
    await this.userService.delete(id);
    return 'User deleted successfully';
  }
}
