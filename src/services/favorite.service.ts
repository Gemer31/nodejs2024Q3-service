import { Injectable } from '@nestjs/common';
import { IFavorites } from '../models/favorites.model';

@Injectable()
export class FavoriteService {
  private favorites: IFavorites = {
    albums: [],
    artists: [],
    tracks: [],
  };

  public async get(): Promise<IFavorites> {
    return this.favorites;
  }

  public async addTrack(trackId: string): Promise<void> {
    this.favorites.tracks = [...new Set([trackId, ...this.favorites.tracks])];
  }

  public async deleteTrack(trackId: string): Promise<void> {
    this.favorites.tracks = this.favorites.tracks.filter((t) => t !== trackId);
  }

  public async addArtist(artistId: string): Promise<void> {
    this.favorites.artists = [
      ...new Set([artistId, ...this.favorites.artists]),
    ];
  }

  public async deleteArtist(artistId: string): Promise<void> {
    this.favorites.artists = this.favorites.artists.filter(
      (a) => a !== artistId,
    );
  }

  public async addAlbum(albumId: string): Promise<void> {
    this.favorites.albums = [...new Set([albumId, ...this.favorites.albums])];
  }

  public async deleteAlbum(albumId: string): Promise<void> {
    this.favorites.albums = this.favorites.albums.filter((a) => a !== albumId);
  }
}
