import { Injectable, NotFoundException } from '@nestjs/common';
import { ArtistDto, CreateArtistDto, UpdateArtistDto } from '../dto/artist.dto';
import { PrismaService } from './prisma.service';
import { MessageHelper } from '../helpers/message.helper';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  public async getAll(params?: { ids?: string[] }) {
    let artists;

    if (params?.ids?.length) {
      artists = await this.prisma.artist.findMany({
        where: {
          id: {
            in: params.ids,
          },
        },
      });
    } else {
      artists = await this.prisma.artist.findMany();
    }

    return artists as ArtistDto[];
  }

  public async get(id: string, throwErr = true) {
    const artist = await this.prisma.artist.findUnique({
      where: { id },
    });
    if (!artist && throwErr) {
      throw new NotFoundException(MessageHelper.entityNotFound('Artist', id));
    }
    return artist as ArtistDto;
  }

  public async create(createArtistDto: CreateArtistDto) {
    const artist = await this.prisma.artist.create({
      data: createArtistDto,
    });
    return artist as ArtistDto;
  }

  public async update(id: string, data: UpdateArtistDto) {
    let artist = await this.get(id);
    artist = await this.prisma.artist.update({
      where: { id },
      data: { ...artist, ...data },
    });
    return artist as ArtistDto;
  }

  public async delete(id: string) {
    let artist = await this.get(id);
    artist = await this.prisma.artist.delete({
      where: { id: artist.id },
    });
    return artist as ArtistDto;
  }
}
