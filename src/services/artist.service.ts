import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto, UpdateArtistDto } from '../dto/artist.dto';
import { PrismaService } from './prisma.service';
import { MessageHelper } from '../helpers/message.helper';
import { Artist } from '@prisma/client';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  public async getAll(params?: { ids?: string[] }): Promise<Artist[]> {
    let artists: Artist[];

    if (params?.ids !== undefined) {
      artists = params.ids?.length
        ? await this.prisma.artist.findMany({
            where: {
              id: { in: params.ids || [] },
            },
          })
        : [];
    } else {
      artists = await this.prisma.artist.findMany();
    }

    return artists;
  }

  public async get(id: string, throwErr = true): Promise<Artist> {
    const artist = await this.prisma.artist.findUnique({
      where: { id },
    });
    if (!artist && throwErr) {
      throw new NotFoundException(MessageHelper.entityNotFound('Artist', id));
    }
    return artist;
  }

  public async create(data: CreateArtistDto): Promise<Artist> {
    return this.prisma.artist.create({ data });
  }

  public async update(id: string, data: UpdateArtistDto): Promise<Artist> {
    let artist = await this.get(id);
    artist = await this.prisma.artist.update({
      where: { id },
      data: { ...artist, ...data },
    });
    return artist;
  }

  public async delete(id: string): Promise<Artist> {
    let artist = await this.get(id);
    artist = await this.prisma.artist.delete({
      where: { id: artist.id },
    });
    return artist;
  }
}
