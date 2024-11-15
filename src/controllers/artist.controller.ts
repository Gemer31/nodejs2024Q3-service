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
import { ArtistService } from '../services/artist.service';
import { ArtistDto, CreateArtistDto } from '../dto/artist.dto';
import { AlbumService } from '../services/album.service';
import { TrackService } from '../services/track.service';
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

@Controller('artist')
export class ArtistController {
  constructor(
    private artistService: ArtistService,
    private albumService: AlbumService,
    private trackService: TrackService,
  ) {}

  @ApiOperation({
    summary: 'Get all artists',
    description: 'Get all artists',
  })
  @ApiOkResponse({
    description: 'Successful operation',
    example: SwaggerExamples.ARTISTS,
  })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @Get()
  getAll(): Promise<ArtistDto[]> {
    return this.artistService.getAll();
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
    example: SwaggerExamples.ARTIST,
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
  async get(@Param() { id }: IdDto): Promise<ArtistDto> {
    return this.artistService.get(id);
  }

  @ApiOperation({
    summary: 'Add new artist',
    description: 'Add new artist',
  })
  @ApiCreatedResponse({
    description: 'Artist is created',
    example: SwaggerExamples.ARTIST,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. body does not contain required fields',
  })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @Post()
  create(@Body() body: CreateArtistDto): Promise<ArtistDto> {
    return this.artistService.create(body);
  }

  @ApiOperation({
    summary: 'Update artist information',
    description: 'Update artist information by UUID',
  })
  @ApiParam({
    name: 'id',
    type: 'string($uuid)',
    required: true,
  })
  @ApiOkResponse({
    description: 'The artist has been updated.',
    example: SwaggerExamples.ARTIST,
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
  @Put(':id')
  update(
    @Param() { id }: IdDto,
    @Body() body: CreateArtistDto,
  ): Promise<ArtistDto> {
    return this.artistService.update(id, body);
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
    await this.artistService.delete(id);
    await this.albumService.removerArtistFromAlbums(id);
    await this.trackService.removeArtistFromTrack(id);
    return MessageHelper.deleteSuccessfully('Artist');
  }
}
