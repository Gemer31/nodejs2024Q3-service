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
import { MessageHelper } from '../helpers/message.helper';
import { ArtistService } from '../services/artist.service';
import { ArtistDto, CreateArtistDto } from '../dto/artist.dto';
import { StatusCodes } from 'http-status-codes';
import { SwaggerExamples } from '../helpers/swagger.helper';
import { ApiGetAllOperation } from '../decorators/api-operations/api-get-all-response.decorator';
import { ApiUpdateOperation } from '../decorators/api-operations/api-update-operation.decorator';
import { ApiDeleteOperation } from '../decorators/api-operations/api-delete-operation.decorator';
import { ApiAddOperation } from '../decorators/api-operations/api-create-operation.decorator';
import { ApiGetSingleOperation } from '../decorators/api-operations/api-get-single-operation.decorator';

// @ApiBearerAuth()
@Controller('artist')
@UseInterceptors(ClassSerializerInterceptor)
export class ArtistController {
  constructor(private artistService: ArtistService) {
  }

  @ApiGetAllOperation('Artists')
  @Get()
  getAll(): Promise<ArtistDto[]> {
    return this.artistService.getAll();
  }

  @ApiGetSingleOperation('Artist', SwaggerExamples.USER)
  @Get(':id')
  async get(@Param() { id }: IdDto): Promise<ArtistDto> {
    return this.artistService.get(id);
  }

  @ApiAddOperation('Artist', SwaggerExamples.USER)
  @Post()
  create(@Body() body: CreateArtistDto): Promise<ArtistDto> {
    return this.artistService.create(body);
  }

  @ApiUpdateOperation('Artist', SwaggerExamples.USER)
  @Put(':id')
  update(
    @Param() { id }: IdDto,
    @Body() body: CreateArtistDto,
  ): Promise<ArtistDto> {
    return this.artistService.update(id, body);
  }

  @ApiDeleteOperation('Artist')
  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async delete(@Param() { id }: IdDto): Promise<string> {
    await this.artistService.delete(id);
    return MessageHelper.deleteSuccessfully('Artist');
  }
}
