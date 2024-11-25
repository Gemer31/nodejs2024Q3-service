import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateTrackDto } from '../dto/track.dto';
import { PrismaService } from './prisma.service';
import { MessageHelper } from '../helpers/message.helper';
import { Track } from '@prisma/client';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  public async getAll(params?: {
    ids?: string[];
    albumId?: string;
  }): Promise<Track[]> {
    let tracks: Track[];

    if (params?.albumId !== undefined) {
      tracks = await this.prisma.track.findMany({
        where: { albumId: params.albumId },
      });
    } else if (params?.ids !== undefined) {
      tracks = params.ids?.length
        ? await this.prisma.track.findMany({
            where: {
              id: { in: params.ids || [] },
            },
          })
        : [];
    } else {
      tracks = await this.prisma.track.findMany();
    }

    return tracks;
  }

  public async get(id: string, throwErr = true): Promise<Track> {
    const track = await this.prisma.track.findUnique({
      where: { id },
    });
    if (!track && throwErr) {
      throw new NotFoundException(MessageHelper.entityNotFound('Track', id));
    }
    return track;
  }

  public async create(data): Promise<Track> {
    return this.prisma.track.create({ data });
  }

  public async update(id: string, data: UpdateTrackDto): Promise<Track> {
    let track = await this.get(id);
    track = await this.prisma.track.update({
      where: { id },
      data: { ...track, ...data },
    });
    return track;
  }

  public async delete(id: string): Promise<Track> {
    let track = await this.get(id);
    track = await this.prisma.track.delete({
      where: { id: track.id },
    });
    return track;
  }
}
