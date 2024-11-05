import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';
import { MessageHelper } from '../helpers/message.helper';
import { AlbumDto, CreateAlbumDto } from '../dto/album.dto';

@Injectable()
export class AlbumService {
  private albums: Map<string, AlbumDto> = new Map();

  public async getAll(): Promise<AlbumDto[]> {
    return [...this.albums.values()];
  }

  public async get(id: string): Promise<AlbumDto> {
    const album: AlbumDto = this.albums.get(id);
    if (!album) {
      throw new NotFoundException(MessageHelper.notFound('Album', id));
    }
    return this.albums.get(id);
  }

  public async create(data: CreateAlbumDto): Promise<AlbumDto> {
    const newAlbum: AlbumDto = {
      id: v4(),
      ...data,
    };
    this.albums.set(newAlbum.id, newAlbum);

    return newAlbum;
  }

  public async update(id: string, data: CreateAlbumDto): Promise<AlbumDto> {
    const album = await this.get(id);
    this.albums.set(id, {
      id,
      ...data,
    });
    return album;
  }

  public async delete(id: string): Promise<void> {
    const album = await this.get(id);
    this.albums.delete(album.id);
  }
}
