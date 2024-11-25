import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UnprocessableEntityException,
  UseInterceptors,
} from '@nestjs/common';
import { FavoriteService } from '../services/favorite.service';
import { TrackService } from '../services/track.service';
import { AlbumService } from '../services/album.service';
import { ArtistService } from '../services/artist.service';
import { IdDto } from '../dto/common.dto';
import { MessageHelper } from '../helpers/message.helper';
import { StatusCodes } from 'http-status-codes';
import { SwaggerExamples } from '../helpers/swagger.helper';
import { ApiGetAllOperation } from '../decorators/api-operations/api-get-all-response.decorator';
import { ApiAddOperation } from '../decorators/api-operations/api-create-operation.decorator';
import { ApiDeleteOperation } from '../decorators/api-operations/api-delete-operation.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@Controller('favs')
@UseInterceptors(ClassSerializerInterceptor)
export class FavouritesController {
  constructor(
    private favoriteService: FavoriteService,
    private trackService: TrackService,
    private albumService: AlbumService,
    private artistService: ArtistService,
  ) {}

  @ApiGetAllOperation('Favorites')
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

  @ApiAddOperation('Track', SwaggerExamples.TRACK)
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

  @ApiDeleteOperation('Track')
  @Delete('track/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async deleteTrack(@Param() { id }: IdDto): Promise<string> {
    const track = await this.trackService.get(id);
    await this.favoriteService.deleteTrack(track.id);

    return MessageHelper.deleteSuccessfully('Track');
  }

  @ApiAddOperation('Album', SwaggerExamples.ALBUM)
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

  @ApiDeleteOperation('Album')
  @Delete('album/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async deleteAlbum(@Param() { id }: IdDto): Promise<string> {
    const album = await this.albumService.get(id);
    await this.favoriteService.deleteAlbum(album.id);

    return MessageHelper.deleteSuccessfully('Album');
  }

  @ApiAddOperation('Artist', SwaggerExamples.ARTIST)
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

  @ApiDeleteOperation('Artist')
  @Delete('artist/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async deleteArtist(@Param() { id }: IdDto): Promise<string> {
    const artist = await this.artistService.get(id);
    await this.favoriteService.deleteArtist(artist.id);

    return MessageHelper.deleteSuccessfully('Artist');
  }
}
