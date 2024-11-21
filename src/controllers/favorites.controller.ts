import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavoriteService } from '../services/favorite.service';
import { TrackService } from '../services/track.service';
import { AlbumService } from '../services/album.service';
import { ArtistService } from '../services/artist.service';
import { IdDto } from '../dto/common.dto';
import { MessageHelper } from '../helpers/message.helper';
import {
  ApiBadRequestResponse, ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { StatusCodes } from 'http-status-codes';
import { SwaggerExamples } from '../helpers/swagger.helper';

@ApiBearerAuth()
@Controller('favs')
export class FavouritesController {
  constructor(
    private favoriteService: FavoriteService,
    private trackService: TrackService,
    private albumService: AlbumService,
    private artistService: ArtistService,
  ) {}

  @ApiOperation({
    summary: 'Get all favorites',
    description: 'Gets all favorites movies, tracks and books',
  })
  @ApiOkResponse({
    description: 'Successful operation',
    example: SwaggerExamples.FAVORITES,
  })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @Get()
  async getAll() {
    const favorites = await this.favoriteService.get();

    const tracks = await this.trackService.getAll({
      ids: favorites.tracks,
    });
    const albums = await this.albumService.getAll({
      ids: favorites.albums,
    });
    const artists = await this.artistService.getAll({
      ids: favorites.artists,
    });

    return { tracks, albums, artists };
  }

  @ApiOperation({
    summary: 'Add track to the favorites',
    description: 'Add track to the favorites',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
    required: true,
  })
  @ApiCreatedResponse({
    description: 'Added successfully',
    example: SwaggerExamples.TRACK,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. TrackId is invalid',
  })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Track with id doesnt exist',
  })
  @Post('track/:id')
  async addTrack(@Param() { id }: IdDto) {
    const track = await this.trackService.get(id, false);
    if (!track) {
      throw new UnprocessableEntityException(
        MessageHelper.entityNotFound('Track', id),
      );
    }
    await this.favoriteService.addTrack(id);

    return track;
  }

  @ApiOperation({
    summary: 'Delete track from favorites',
    description: 'Delete track from favorites',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
    required: true,
  })
  @ApiNoContentResponse({
    description: 'Deleted successfully',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. TrackId is invalid (not uuid)',
  })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @ApiNotFoundResponse({
    description: 'Track was not found',
  })
  @Delete('track/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async deleteTrack(@Param() { id }: IdDto): Promise<string> {
    const track = await this.trackService.get(id);
    await this.favoriteService.deleteTrack(track.id);

    return MessageHelper.deleteSuccessfully('Track');
  }

  @ApiOperation({
    summary: 'Add album to the favorites',
    description: 'Add album to the favorites',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
    required: true,
  })
  @ApiCreatedResponse({
    description: 'Added successfully',
    example: SwaggerExamples.ALBUM,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. AlbumId is invalid',
  })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Album with id doesnt exist',
  })
  @Post('album/:id')
  async addAlbum(@Param() { id }: IdDto) {
    const album = await this.albumService.get(id, false);
    if (!album) {
      throw new UnprocessableEntityException(
        MessageHelper.entityNotFound('Album', id),
      );
    }
    await this.favoriteService.addAlbum(id);

    return album;
  }

  @ApiOperation({
    summary: 'Delete album from favorites',
    description: 'Delete album from favorites',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
    required: true,
  })
  @ApiNoContentResponse({
    description: 'Deleted successfully',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. AlbumId is invalid (not uuid)',
  })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @ApiNotFoundResponse({
    description: 'Album was not found',
  })
  @Delete('album/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async deleteAlbum(@Param() { id }: IdDto): Promise<string> {
    const album = await this.albumService.get(id);
    await this.favoriteService.deleteAlbum(album.id);

    return MessageHelper.deleteSuccessfully('Album');
  }

  @ApiOperation({
    summary: 'Add artist to the favorites',
    description: 'Add artist to the favorites',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
    required: true,
  })
  @ApiCreatedResponse({
    description: 'Added successfully',
    example: SwaggerExamples.ARTIST,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. ArtistId is invalid',
  })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Artist with id doesnt exist',
  })
  @Post('artist/:id')
  async addArtist(@Param() { id }: IdDto) {
    const artist = await this.artistService.get(id, false);
    if (!artist) {
      throw new UnprocessableEntityException(
        MessageHelper.entityNotFound('Artist', id),
      );
    }
    await this.favoriteService.addArtist(id);

    return artist;
  }

  @ApiOperation({
    summary: 'Delete artist from favorites',
    description: 'Delete artist from favorites',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
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
  @Delete('artist/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async deleteArtist(@Param() { id }: IdDto): Promise<string> {
    const artist = await this.artistService.get(id);
    await this.favoriteService.deleteArtist(artist.id);

    return MessageHelper.deleteSuccessfully('Artist');
  }
}
