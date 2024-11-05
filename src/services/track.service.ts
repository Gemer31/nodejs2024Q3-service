import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';
import { CreateTrackDto, ArtistDto, UpdateTrackDto } from "../dto/artistDto";
import { MessageHelper } from '../helpers/message.helper';

@Injectable()
export class TrackService {
  private tracks: Map<string, ArtistDto> = new Map();

  public async getAll(): Promise<ArtistDto[]> {
    return [...this.tracks.values()];
  }

  public async get(id: string): Promise<ArtistDto> {
    const track: ArtistDto = this.tracks.get(id);
    if (!track) {
      throw new NotFoundException(MessageHelper.notFound('Track', id));
    }
    return this.tracks.get(id);
  }

  public async create(data: CreateTrackDto): Promise<ArtistDto> {
    const newTrack: ArtistDto = {
      id: v4(),
      ...data,
    };
    this.tracks.set(newTrack.id, newTrack);

    return newTrack;
  }

  public async update(id: string, data: UpdateTrackDto): Promise<ArtistDto> {
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
