import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';
import { MessageHelper } from '../helpers/message.helper';
import { AlbumDto, CreateAlbumDto, UpdateAlbumDto } from '../dto/album.dto';

@Injectable()
export class AlbumService {
  private albums: Map<string, AlbumDto> = new Map();

  public async getAll({
    artistId,
    albumId,
    ids,
  }: {
    artistId?: string;
    albumId?: string;
    ids?: string[];
  } = {}): Promise<AlbumDto[]> {
    const albums: AlbumDto[] = [...this.albums.values()];
    if (artistId) {
      return albums.filter((a) => a.artistId === artistId);
    }
    if (ids?.length) {
      return albums.filter((a) => ids.includes(a.id));
    }
    return albums;
  }

  public async get(id: string, throwErr: boolean = true): Promise<AlbumDto> {
    const album: AlbumDto = this.albums.get(id);
    if (!album && throwErr) {
      throw new NotFoundException(MessageHelper.entityNotFound('Album', id));
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

  public async update(id: string, data: UpdateAlbumDto): Promise<AlbumDto> {
    const album = await this.get(id);
    const updateAlbum = {
      ...album,
      ...data,
    };
    this.albums.set(id, updateAlbum);
    return updateAlbum;
  }

  public async delete(id: string): Promise<void> {
    const album = await this.get(id);
    this.albums.delete(album.id);
  }

  public async removerArtistFromAlbums(artistId: string): Promise<void> {
    const albums = await this.getAll({ artistId });
    albums.forEach(async (a) => {
      await this.update(a.id, { artistId: null });
    });
  }
}
