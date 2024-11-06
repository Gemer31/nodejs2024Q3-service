import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';
import { MessageHelper } from '../helpers/message.helper';
import { CreateArtistDto, ArtistDto } from '../dto/artist.dto';

@Injectable()
export class ArtistService {
  private artists: Map<string, ArtistDto> = new Map();

  public async getAll(): Promise<ArtistDto[]> {
    return [...this.artists.values()];
  }

  public async get(id: string): Promise<ArtistDto> {
    const artist: ArtistDto = this.artists.get(id);
    if (!artist) {
      throw new NotFoundException(MessageHelper.entityNotFound('Artist', id));
    }
    return this.artists.get(id);
  }

  public async create(data: CreateArtistDto): Promise<ArtistDto> {
    const newArtist: ArtistDto = {
      id: v4(),
      ...data,
    };
    this.artists.set(newArtist.id, newArtist);

    return newArtist;
  }

  public async update(id: string, data: CreateArtistDto): Promise<ArtistDto> {
    const artist = await this.get(id);
    const updateArtist: ArtistDto = {
      ...artist,
      ...data,
    };
    this.artists.set(id, updateArtist);
    return updateArtist;
  }

  public async delete(id: string): Promise<void> {
    const artist = await this.get(id);
    this.artists.delete(artist.id);
  }
}
