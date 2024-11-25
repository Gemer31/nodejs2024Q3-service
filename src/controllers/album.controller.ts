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
import { AlbumService } from '../services/album.service';
import { CreateAlbumDto } from '../dto/album.dto';
import { StatusCodes } from 'http-status-codes';
import { ApiGetAllOperation } from '../decorators/api-operations/api-get-all-response.decorator';
import { ApiAddOperation } from '../decorators/api-operations/api-create-operation.decorator';
import { SwaggerExamples } from '../helpers/swagger.helper';
import { ApiGetSingleOperation } from '../decorators/api-operations/api-get-single-operation.decorator';
import { ApiUpdateOperation } from '../decorators/api-operations/api-update-operation.decorator';
import { ApiDeleteOperation } from '../decorators/api-operations/api-delete-operation.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@Controller('album')
@UseInterceptors(ClassSerializerInterceptor)
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @ApiGetAllOperation('Albums')
  @Get()
  getAll() {
    return this.albumService.getAll();
  }

  @ApiGetSingleOperation('Album', SwaggerExamples.ALBUM)
  @Get(':id')
  async get(@Param() { id }: IdDto) {
    return this.albumService.get(id);
  }

  @ApiAddOperation('Album', SwaggerExamples.ALBUM)
  @Post()
  create(@Body() body: CreateAlbumDto) {
    return this.albumService.create(body);
  }

  @ApiUpdateOperation('Album', SwaggerExamples.ALBUM)
  @Put(':id')
  update(@Param() { id }: IdDto, @Body() body: CreateAlbumDto) {
    return this.albumService.update(id, body);
  }

  @ApiDeleteOperation('Album')
  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async delete(@Param() { id }: IdDto): Promise<string> {
    await this.albumService.delete(id);
    return MessageHelper.deleteSuccessfully('Album');
  }
}
