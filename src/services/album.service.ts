import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto, UpdateAlbumDto } from '../dto/album.dto';
import { PrismaService } from './prisma.service';
import { MessageHelper } from '../helpers/message.helper';
import { Album } from '@prisma/client';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {
  }

  public async getAll(params?: { ids?: string[]; artistId?: string }): Promise<Album[]> {
    let albums: Album[];

    if (params?.artistId !== undefined) {
      albums = await this.prisma.album.findMany({
        where: { artistId: params.artistId },
      });
    } else if (params?.ids !== undefined) {
      albums = params.ids?.length
        ? await this.prisma.album.findMany({
          where: {
            id: { in: params.ids || [] },
          },
        })
        : [];
    } else {
      albums = await this.prisma.album.findMany();
    }

    return albums;
  }

  public async get(id: string, throwErr = true): Promise<Album> {
    const album: Album = await this.prisma.album.findUnique({ where: { id } });
    if (!album && throwErr) {
      throw new NotFoundException(MessageHelper.entityNotFound('Album', id));
    }
    return album;
  }

  public async create(data: CreateAlbumDto): Promise<Album> {
    return this.prisma.album.create({ data });
  }

  public async update(id: string, data: UpdateAlbumDto): Promise<Album> {
    let album = await this.get(id);
    album = await this.prisma.album.update({
      where: { id },
      data: { ...album, ...data },
    });
    return album;
  }

  public async delete(id: string): Promise<Album> {
    let album: Album = await this.get(id);
    album = await this.prisma.album.delete({ where: { id: album.id } });
    return album;
  }
}
