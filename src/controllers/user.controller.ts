import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto, UpdatePasswordDto, UserDto } from '../dto/user.dto';
import { IdDto } from '../dto/common.dto';
import { StatusCodes } from 'http-status-codes';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiCreateUserOperation } from '../decorators/api-create-user-operation.decorator';
import { ApiGetUserOperation } from '../decorators/api-get-user-operation.decorator';
import { ApiUpdateUserOperation } from '../decorators/api-update-user-operation.decorator';
import { ApiDeleteUserOperation } from '../decorators/api-delete-user-operation.decorator';
import { ApiGetUsersOperation } from '../decorators/api-get-all-users-operation.decorator';

@ApiBearerAuth('access-token')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiGetUsersOperation()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getAll() {
    const users = await this.userService.getAll();
    return users.map((user) => new UserDto(user));
  }

  @ApiGetUserOperation()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async get(@Param() { id }: IdDto) {
    const user = await this.userService.get(id);
    return new UserDto(user);
  }

  @ApiCreateUserOperation()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body() body: CreateUserDto) {
    const user = await this.userService.create(body);
    return new UserDto(user);
  }

  @ApiUpdateUserOperation()
  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  async update(
    @Param() { id }: IdDto,
    @Body() body: UpdatePasswordDto,
  ): Promise<UserDto> {
    const user = await this.userService.get(id);
    const updateUser = await this.userService.updatePassword(user.id, body);
    return new UserDto(updateUser);
  }

  @ApiDeleteUserOperation()
  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async delete(@Param() { id }: IdDto): Promise<string> {
    await this.userService.delete(id);
    return 'User deleted successfully';
  }
}
