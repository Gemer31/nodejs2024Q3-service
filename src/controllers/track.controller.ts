import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { IdDto } from '../dto/common.dto';
import { CreateTrackDto, TrackDto, UpdateTrackDto } from '../dto/track.dto';
import { TrackService } from '../services/track.service';
import { MessageHelper } from '../helpers/message.helper';
import { SwaggerExamples } from '../helpers/swagger.helper';
import { StatusCodes } from 'http-status-codes';
import { ApiDeleteOperation } from '../decorators/api-operations/api-delete-operation.decorator';
import { ApiUpdateOperation } from '../decorators/api-operations/api-update-operation.decorator';
import { ApiAddOperation } from '../decorators/api-operations/api-create-operation.decorator';
import { ApiGetSingleOperation } from '../decorators/api-operations/api-get-single-operation.decorator';
import { ApiGetAllOperation } from '../decorators/api-operations/api-get-all-response.decorator';

// @ApiBearerAuth()
@Controller('track')
@UseInterceptors(ClassSerializerInterceptor)
export class TrackController {
  constructor(private trackService: TrackService) {
  }

  @ApiGetAllOperation('Tracks')
  @Get()
  getAll() {
    return this.trackService.getAll();
  }

  @ApiGetSingleOperation('Track', SwaggerExamples.TRACK)
  @Get(':id')
  async get(@Param() { id }: IdDto): Promise<TrackDto> {
    return this.trackService.get(id);
  }

  @ApiAddOperation('Track', SwaggerExamples.TRACK)
  @Post()
  create(@Body() body: CreateTrackDto) {
    return this.trackService.create(body);
  }

  @ApiUpdateOperation('Track', SwaggerExamples.TRACK)
  @Put(':id')
  update(
    @Param() { id }: IdDto,
    @Body() body: UpdateTrackDto,
  ): Promise<TrackDto> {
    return this.trackService.update(id, body);
  }

  @ApiDeleteOperation('Track')
  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async delete(@Param() { id }: IdDto): Promise<string> {
    await this.trackService.delete(id);
    return MessageHelper.deleteSuccessfully('Track');
  }
}
