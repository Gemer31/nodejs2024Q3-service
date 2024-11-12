import { Injectable, NotFoundException } from '@nestjs/common';
import { AlbumDto, CreateAlbumDto, UpdateAlbumDto } from '../dto/album.dto';
import { PrismaService } from './prisma.service';
import { MessageHelper } from '../helpers/message.helper';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  async getAll(params?: { ids?: string[]; artistId?: string }) {
    let albums;

    if (params?.artistId !== undefined) {
      albums = await this.prisma.album.findMany({
        where: { artistId: params.artistId },
      });
    } else if (params?.ids !== undefined) {
      albums = await this.prisma.album.findMany({
        where: {
          id: { in: params.ids || [] },
        },
      });
    } else {
      albums = await this.prisma.album.findMany();
    }

    return albums as AlbumDto[];
  }

  async get(id: string, throwErr = true) {
    const album = await this.prisma.album.findUnique({ where: { id } });
    if (!album && throwErr) {
      throw new NotFoundException(MessageHelper.entityNotFound('Album', id));
    }
    return album as AlbumDto;
  }

  async create(createAlbumDto: CreateAlbumDto) {
    const album = await this.prisma.album.create({ data: createAlbumDto });
    return album as AlbumDto;
  }

  async update(id: string, data: UpdateAlbumDto) {
    let album = await this.get(id);
    album = await this.prisma.album.update({
      where: { id },
      data: { ...album, ...data },
    });
    return album as AlbumDto;
  }

  async delete(id: string) {
    let album = await this.get(id);
    album = await this.prisma.album.delete({ where: { id: album.id } });
    return album as AlbumDto;
  }
}
