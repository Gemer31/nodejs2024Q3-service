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
import { ApiGetSingleOperation } from '../decorators/api-operations/api-get-single-operation.decorator';
import { SwaggerExamples } from '../helpers/swagger.helper';
import { ApiAddOperation } from '../decorators/api-operations/api-create-operation.decorator';
import { ApiDeleteOperation } from '../decorators/api-operations/api-delete-operation.decorator';
import { ApiUpdateOperation } from '../decorators/api-operations/api-update-operation.decorator';
import { ApiGetAllOperation } from '../decorators/api-operations/api-get-all-response.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
@ApiBearerAuth('access-token')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiGetAllOperation('Users')
  @Get()
  async getAll() {
    const users = await this.userService.getAll();
    return users.map((user) => new UserDto(user));
  }

  @ApiGetSingleOperation('User', SwaggerExamples.USER)
  @Get(':id')
  async get(@Param() { id }: IdDto) {
    const user = await this.userService.get(id);
    return new UserDto(user);
  }

  @ApiAddOperation('User', SwaggerExamples.USER)
  @Post()
  async create(@Body() body: CreateUserDto) {
    const user = await this.userService.create(body);
    return new UserDto(user);
  }

  @ApiUpdateOperation('User', SwaggerExamples.USER)
  @Put(':id')
  async update(
    @Param() { id }: IdDto,
    @Body() body: UpdatePasswordDto,
  ): Promise<UserDto> {
    const user = await this.userService.get(id);
    const updateUser = await this.userService.updatePassword(user.id, body);
    return new UserDto(updateUser);
  }

  @ApiDeleteOperation('User')
  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async delete(@Param() { id }: IdDto): Promise<string> {
    await this.userService.delete(id);
    return 'User deleted successfully';
  }
}
