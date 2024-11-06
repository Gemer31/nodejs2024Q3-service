import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';
import { CreateTrackDto, TrackDto, UpdateTrackDto } from "../dto/track.dto";
import { MessageHelper } from '../helpers/message.helper';

@Injectable()
export class TrackService {
  private tracks: Map<string, TrackDto> = new Map();

  public async getAll(): Promise<TrackDto[]> {
    return [...this.tracks.values()];
  }

  public async get(id: string): Promise<TrackDto> {
    const track: TrackDto = this.tracks.get(id);
    if (!track) {
      throw new NotFoundException(MessageHelper.entityNotFound('Track', id));
    }
    return this.tracks.get(id);
  }

  public async create(data: CreateTrackDto): Promise<TrackDto> {
    const newTrack: TrackDto = {
      id: v4(),
      ...data,
    };
    this.tracks.set(newTrack.id, newTrack);

    return newTrack;
  }

  public async update(id: string, data: UpdateTrackDto): Promise<TrackDto> {
    const track = await this.get(id);
    this.tracks.set(id, {
      id,
      ...data,
    });
    return track;
  }

  public async delete(id: string): Promise<void> {
    const track = await this.get(id);
    this.tracks.delete(track.id);
  }
}
