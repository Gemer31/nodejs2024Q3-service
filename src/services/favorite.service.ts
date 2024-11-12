import { Injectable } from '@nestjs/common';
import { IFavorites } from '../models/favorites.model';
import { PrismaService } from './prisma.service';

@Injectable()
export class FavoriteService {
  constructor(private prisma: PrismaService) {
  }

  public async get(): Promise<IFavorites> {
    let favs = await this.prisma.favorites.findFirst();

    if (!favs) {
      favs = await this.prisma.favorites.create({
        data: {
          albums: [],
          artists: [],
          tracks: [],
        },
      });
    }

    return favs;
  }

  public async addTrack(trackId: string): Promise<void> {
    const favs = await this.get();
    favs.tracks = [...new Set([trackId, ...favs.tracks])];
    await this.prisma.favorites.update({
      where: { id: favs.id },
      data: favs
    });
  }

  public async deleteTrack(trackId: string): Promise<void> {
    const favs = await this.get();
    favs.tracks = favs.tracks.filter((t) => t !== trackId);
    await this.prisma.favorites.update({
      where: { id: favs.id },
      data: favs
    });
  }

  public async addArtist(artistId: string): Promise<void> {
    const favs = await this.get();
    favs.artists = [...new Set([artistId, ...favs.artists])];
    await this.prisma.favorites.update({
      where: { id: favs.id },
      data: favs
    });
  }

  public async deleteArtist(artistId: string): Promise<void> {
    const favs = await this.get();
    favs.artists = favs.artists.filter((a) => a !== artistId);
    await this.prisma.favorites.update({
      where: { id: favs.id },
      data: favs
    });
  }

  public async addAlbum(albumId: string): Promise<void> {
    const favs = await this.get();
    favs.albums = [...new Set([albumId, ...favs.albums])];
    await this.prisma.favorites.update({
      where: { id: favs.id },
      data: favs
    });
  }

  public async deleteAlbum(albumId: string): Promise<void> {
    const favs = await this.get();
    favs.albums = favs.albums.filter((a) => a !== albumId);
    await this.prisma.favorites.update({
      where: { id: favs.id },
      data: favs
    });
  }
}
