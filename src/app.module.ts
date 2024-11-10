import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { TrackController } from './controllers/track.controller';
import { TrackService } from './services/track.service';
import { ArtistController } from './controllers/artist.controller';
import { ArtistService } from './services/artist.service';
import { AlbumController } from './controllers/album.controller';
import { AlbumService } from './services/album.service';
import { FavouritesController } from './controllers/favorites.controller';
import { FavoriteService } from './services/favorite.service';
import { PrismaService } from './services/prisma.service';

@Module({
  imports: [],
  controllers: [
    AlbumController,
    ArtistController,
    TrackController,
    UserController,
    FavouritesController,
  ],
  providers: [
    AlbumService,
    ArtistService,
    TrackService,
    UserService,
    FavoriteService,
    PrismaService,
  ],
})
export class AppModule {}
