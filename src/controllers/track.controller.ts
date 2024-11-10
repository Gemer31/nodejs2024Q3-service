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
import { CreateTrackDto, TrackDto, UpdateTrackDto } from '../dto/track.dto';
import { TrackService } from '../services/track.service';
import { MessageHelper } from '../helpers/message.helper';
import { StatusCodes } from 'http-status-codes';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  getAll() {
    return this.trackService.getAll();
  }

  @Get(':id')
  async get(@Param() { id }: IdDto): Promise<TrackDto> {
    return this.trackService.get(id);
  }

  @Post()
  create(@Body() body: CreateTrackDto) {
    return this.trackService.create(body);
  }

  @Put(':id')
  update(
    @Param() { id }: IdDto,
    @Body() body: UpdateTrackDto,
  ): Promise<TrackDto> {
    return this.trackService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async delete(@Param() { id }: IdDto): Promise<string> {
    await this.trackService.delete(id);
    return MessageHelper.deleteSuccessfully('Track');
  }
}
