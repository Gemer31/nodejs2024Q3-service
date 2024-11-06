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

@Controller('artist')
export class ArtistController {
  constructor(
    private artistService: ArtistService,
    private albumService: AlbumService,
  ) {}

  @Get()
  getAll(): Promise<ArtistDto[]> {
    return this.artistService.getAll();
  }

  @Get(':id')
  async get(@Param() { id }: IdDto): Promise<ArtistDto> {
    return this.artistService.get(id);
  }

  @Post()
  create(@Body() body: CreateArtistDto): Promise<ArtistDto> {
    return this.artistService.create(body);
  }

  @Put(':id')
  update(
    @Param() { id }: IdDto,
    @Body() body: CreateArtistDto,
  ): Promise<ArtistDto> {
    return this.artistService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param() { id }: IdDto): Promise<string> {
    await this.artistService.delete(id);
    const albums = await this.albumService.getAll(id);
    albums.forEach(async (a) => {
      await this.albumService.update(a.id, { artistId: null });
    });
    return MessageHelper.deleteSuccessfully('Artist');
  }
}
