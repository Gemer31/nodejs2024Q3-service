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
import { StatusCodes } from 'http-status-codes';
import { SwaggerExamples } from '../helpers/swagger.helper';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({
    summary: 'Get all artists',
    description: 'Get all artists',
  })
  @ApiOkResponse({
    description: 'Successful operation',
    example: SwaggerExamples.USERS,
  })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @ApiOperation({
    summary: 'Get single artist by id',
    description: 'Get single artist by id',
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
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @ApiNotFoundResponse({
    description: 'Artist was not found',
  })
  @Get(':id')
  async get(@Param() { id }: IdDto): Promise<UserResponseDto> {
    return this.userService.get(id);
  }

  @ApiOperation({
    summary: 'Add new artist',
    description: 'Add new artist',
  })
  @ApiCreatedResponse({
    description: 'Artist is created',
    example: SwaggerExamples.USER,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. body does not contain required fields',
  })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @Post()
  create(@Body() body: CreateUserDto): Promise<UserResponseDto> {
    return this.userService.create(body);
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
    description: 'The artist has been updated.',
    example: SwaggerExamples.USER,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @ApiForbiddenResponse({
    description: 'oldPassword is wrong',
  })
  @ApiNotFoundResponse({
    description: 'Artist was not found',
  })
  @Put(':id')
  async update(
    @Param() { id }: IdDto,
    @Body() body: UpdatePasswordDto,
  ): Promise<UserResponseDto> {
    await this.userService.get(id);
    return this.userService.update(id, body);
  }

  @ApiOperation({
    summary: 'Delete artist',
    description: 'Delete artist from library',
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
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @ApiNotFoundResponse({
    description: 'Artist was not found',
  })
  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async delete(@Param() { id }: IdDto): Promise<string> {
    await this.userService.delete(id);
    return 'User deleted successfully';
  }
}
