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
import { TrackService } from '../services/track.service';

@Controller('album')
export class AlbumController {
  constructor(
    private albumService: AlbumService,
    private trackService: TrackService,
  ) {}

  @Get()
  getAll() {
    return this.albumService.getAll();
  }

  @Get(':id')
  async get(@Param() { id }: IdDto): Promise<AlbumDto> {
    return this.albumService.get(id);
  }

  @Post()
  create(@Body() body: CreateAlbumDto) {
    return this.albumService.create(body);
  }

  @Put(':id')
  update(
    @Param() { id }: IdDto,
    @Body() body: CreateAlbumDto,
  ): Promise<AlbumDto> {
    return this.albumService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param() { id }: IdDto): Promise<string> {
    await this.albumService.delete(id);
    await this.trackService.removeAlbumFromTrack(id);
    return MessageHelper.deleteSuccessfully('Album');
  }
}
