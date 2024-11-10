import { Injectable, NotFoundException } from '@nestjs/common';
import { TrackDto, UpdateTrackDto } from '../dto/track.dto';
import { PrismaService } from './prisma.service';
import { MessageHelper } from '../helpers/message.helper';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  public async getAll(params?: {
    ids?: string[];
    albumId?: string;
  }): Promise<TrackDto[]> {
    let tracks;

    if (params?.albumId) {
      tracks = await this.prisma.track.findMany({
        where: { albumId: params.albumId },
      });
    } else if (params?.ids?.length) {
      tracks = await this.prisma.track.findMany({
        where: {
          id: { in: params.ids },
        },
      });
    } else {
      tracks = await this.prisma.track.findMany();
    }

    return tracks as TrackDto[];
  }

  public async get(id: string, throwErr = true): Promise<TrackDto> {
    const track = await this.prisma.track.findUnique({
      where: { id },
    });
    if (!track && throwErr) {
      throw new NotFoundException(MessageHelper.entityNotFound('Track', id));
    }
    return track as TrackDto;
  }

  public async create(data) {
    const track = await this.prisma.track.create({ data });
    return track as TrackDto;
  }

  public async update(id: string, data: UpdateTrackDto) {
    let track = await this.get(id);
    track = await this.prisma.track.update({
      where: { id },
      data: { ...track, ...data },
    });
    return track as TrackDto;
  }

  public async delete(id: string): Promise<TrackDto> {
    let track = await this.get(id);
    track = await this.prisma.track.delete({
      where: { id: track.id },
    });
    return track as TrackDto;
  }
}
