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

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @ApiOperation({
    summary: 'Get tracks list',
    description: 'Gets all library tracks list',
  })
  @ApiOkResponse({
    description: 'Successful operation',
    example: SwaggerExamples.TRACKS,
  })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @Get()
  getAll() {
    return this.trackService.getAll();
  }

  @ApiOperation({
    summary: 'Get single track by id',
    description: 'Get single track by id',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
    required: true,
  })
  @ApiOkResponse({
    description: 'Successful operation',
    example: SwaggerExamples.TRACK,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @ApiNotFoundResponse({
    description: 'Track was not found',
  })
  @Get(':id')
  async get(@Param() { id }: IdDto): Promise<TrackDto> {
    return this.trackService.get(id);
  }

  @ApiOperation({
    summary: 'Add new track',
    description: 'Add new track information',
  })
  @ApiCreatedResponse({
    description: 'Track is created',
    example: SwaggerExamples.TRACK,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. body does not contain required fields',
  })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @Post()
  create(@Body() body: CreateTrackDto) {
    return this.trackService.create(body);
  }

  @ApiOperation({
    summary: 'Update track information',
    description: 'Update track information by UUID',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
    required: true,
  })
  @ApiOkResponse({
    description: 'The track has been updated.',
    example: SwaggerExamples.TRACK,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @ApiNotFoundResponse({
    description: 'Track was not found',
  })
  @Put(':id')
  update(
    @Param() { id }: IdDto,
    @Body() body: UpdateTrackDto,
  ): Promise<TrackDto> {
    return this.trackService.update(id, body);
  }

  @ApiOperation({
    summary: 'Delete track',
    description: 'Delete track from library',
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
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @ApiNotFoundResponse({
    description: 'Track was not found',
  })
  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async delete(@Param() { id }: IdDto): Promise<string> {
    await this.trackService.delete(id);
    return MessageHelper.deleteSuccessfully('Track');
  }
}
