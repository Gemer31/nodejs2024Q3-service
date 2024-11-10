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
import { StatusCodes } from 'http-status-codes';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

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
  @HttpCode(StatusCodes.NO_CONTENT)
  async delete(@Param() { id }: IdDto): Promise<string> {
    await this.artistService.delete(id);
    return MessageHelper.deleteSuccessfully('Artist');
  }
}
