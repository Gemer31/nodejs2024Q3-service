import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';
import { CreateTrackDto, TrackDto, UpdateTrackDto } from '../dto/track.dto';
import { MessageHelper } from '../helpers/message.helper';

@Injectable()
export class TrackService {
  private tracks: Map<string, TrackDto> = new Map();

  public async getAll({
    artistId,
    albumId,
    ids,
  }: {
    artistId?: string;
    albumId?: string;
    ids?: string[];
  } = {}): Promise<TrackDto[]> {
    const tracks = [...this.tracks.values()];

    if (artistId) {
      return tracks.filter((t) => t.artistId === artistId);
    }
    if (albumId) {
      return tracks.filter((t) => t.albumId === albumId);
    }
    if (ids?.length) {
      return tracks.filter((t) => ids.includes(t.id));
    }

    return tracks;
  }

  public async get(id: string, throwErr: boolean = true): Promise<TrackDto> {
    const track: TrackDto = this.tracks.get(id);
    if (!track && throwErr) {
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
    const updateTrack = { ...track, ...data };
    this.tracks.set(id, updateTrack);
    return updateTrack;
  }

  public async delete(id: string): Promise<void> {
    const track = await this.get(id);
    this.tracks.delete(track.id);
  }

  public async removeArtistFromTrack(artistId: string): Promise<void> {
    const tracks = await this.getAll({ artistId });
    tracks.forEach(async (track) => {
      await this.update(track.id, { artistId: null });
    });
  }

  public async removeAlbumFromTrack(albumId: string): Promise<void> {
    const tracks = await this.getAll({ albumId });
    tracks.forEach(async (track) => {
      await this.update(track.id, { albumId: null });
    });
  }
}
