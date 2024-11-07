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

@Controller('favs')
export class FavouritesController {
  constructor(
    private favoriteService: FavoriteService,
    private trackService: TrackService,
    private albumService: AlbumService,
    private artistService: ArtistService,
  ) {}

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

  @Delete('track/:id')
  @HttpCode(204)
  async deleteTrack(@Param() { id }: IdDto): Promise<string> {
    const track = await this.trackService.get(id);
    await this.favoriteService.deleteTrack(track.id);

    return MessageHelper.deleteSuccessfully('Track');
  }

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

  @Delete('album/:id')
  @HttpCode(204)
  async deleteAlbum(@Param() { id }: IdDto): Promise<string> {
    const album = await this.albumService.get(id);
    await this.favoriteService.deleteAlbum(album.id);

    return MessageHelper.deleteSuccessfully('Album');
  }

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

  @Delete('artist/:id')
  @HttpCode(204)
  async deleteArtist(@Param() { id }: IdDto): Promise<string> {
    const artist = await this.artistService.get(id);
    await this.favoriteService.deleteArtist(artist.id);

    return MessageHelper.deleteSuccessfully('Artist');
  }
}
