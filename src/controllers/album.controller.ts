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
import { IdDto } from '../dto/common.dto';
import { MessageHelper } from '../helpers/message.helper';
import { AlbumService } from '../services/album.service';
import { AlbumDto, CreateAlbumDto } from '../dto/album.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SwaggerExamples } from '../helpers/swagger.helper';
import { StatusCodes } from 'http-status-codes';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @ApiOperation({
    summary: 'Get albums list',
    description: 'Gets all library albums list',
  })
  @ApiOkResponse({
    description: 'Successful operation',
    example: SwaggerExamples.ALBUMS,
  })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @Get()
  getAll() {
    return this.albumService.getAll();
  }

  @ApiOperation({
    summary: 'Get single album by id',
    description: 'Gets single album by id',
  })
  @ApiParam({
    name: 'id',
    type: 'string($uuid)',
    required: true,
  })
  @ApiOkResponse({
    description: 'Successful operation',
    example: SwaggerExamples.ALBUM,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @ApiNotFoundResponse({
    description: 'Album was not found',
  })
  @Get(':id')
  async get(@Param() { id }: IdDto): Promise<AlbumDto> {
    return this.albumService.get(id);
  }

  @ApiOperation({
    summary: 'Add new album',
    description: 'Add new album information',
  })
  @ApiCreatedResponse({
    description: 'Album is created',
    example: SwaggerExamples.ALBUM,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. body does not contain required fields',
  })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @Post()
  create(@Body() body: CreateAlbumDto) {
    return this.albumService.create(body);
  }

  @ApiOperation({
    summary: 'Update album information',
    description: 'Update library album information by UUID',
  })
  @ApiParam({
    name: 'id',
    type: 'string($uuid)',
    required: true,
  })
  @ApiOkResponse({
    description: 'The album has been updated.',
    example: SwaggerExamples.ALBUM,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @ApiNotFoundResponse({
    description: 'Album was not found',
  })
  @Put(':id')
  update(
    @Param() { id }: IdDto,
    @Body() body: CreateAlbumDto,
  ): Promise<AlbumDto> {
    return this.albumService.update(id, body);
  }

  @ApiOperation({
    summary: 'Delete album',
    description: 'Delete album from library',
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
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @ApiNotFoundResponse({
    description: 'Album was not found',
  })
  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async delete(@Param() { id }: IdDto): Promise<string> {
    await this.albumService.delete(id);
    return MessageHelper.deleteSuccessfully('Album');
  }
}
