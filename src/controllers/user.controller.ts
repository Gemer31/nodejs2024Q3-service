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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SwaggerExamples } from '../helpers/swagger.helper';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({
    summary: 'Get all users',
    description: 'Get all users',
  })
  @ApiOkResponse({
    description: 'Successful operation',
    example: SwaggerExamples.USERS,
  })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @Get()
  async getAll() {
    const users = await this.userService.getAll();
    return users.map((user) => this.userService.getUserResponseDto(user));
  }

  @ApiOperation({
    summary: 'Get single user by id',
    description: 'Get single user by id',
  })
  @ApiParam({
    name: 'id',
    type: 'string($uuid)',
    required: true,
  })
  @ApiOkResponse({
    description: 'Successful operation',
    example: SwaggerExamples.USER,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @ApiNotFoundResponse({
    description: 'user was not found',
  })
  @Get(':id')
  async get(@Param() { id }: IdDto) {
    const user = await this.userService.get(id);
    return this.userService.getUserResponseDto(user);
  }

  @ApiOperation({
    summary: 'Add new user',
    description: 'Add new user',
  })
  @ApiCreatedResponse({
    description: 'user is created',
    example: SwaggerExamples.USER,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. body does not contain required fields',
  })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @Post()
  async create(@Body() body: CreateUserDto) {
    const user = await this.userService.create(body);
    return this.userService.getUserResponseDto(user);
  }

  @ApiOperation({
    summary: 'Update user password',
    description: 'Update user password by UUID',
  })
  @ApiParam({
    name: 'id',
    type: 'string($uuid)',
    required: true,
  })
  @ApiOkResponse({
    description: 'The user has been updated.',
    example: SwaggerExamples.USER,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @ApiForbiddenResponse({
    description: 'oldPassword is wrong',
  })
  @ApiNotFoundResponse({
    description: 'user was not found',
  })
  @Put(':id')
  async update(
    @Param() { id }: IdDto,
    @Body() body: UpdatePasswordDto,
  ): Promise<UserResponseDto> {
    await this.userService.get(id);
    const user = await this.userService.updatePassword(id, body);
    return this.userService.getUserResponseDto(user);
  }

  @ApiOperation({
    summary: 'Delete user',
    description: 'Delete user from library',
  })
  @ApiParam({
    name: 'id',
    type: 'string($uuid)',
    required: true,
  })
  @ApiNoContentResponse({
    description: 'Deleted successfully',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. UserId is invalid (not uuid)',
  })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @ApiNotFoundResponse({
    description: 'user was not found',
  })
  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async delete(@Param() { id }: IdDto): Promise<string> {
    await this.userService.delete(id);
    return 'User deleted successfully';
  }
}
