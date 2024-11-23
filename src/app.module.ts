import { Module, ValidationPipe } from '@nestjs/common';
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
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { AuthGuard } from './guards/auth.guard';
import { AuthController } from './controllers/auth.controller';
import { LoggingService } from './services/logging.service';
import { HttpExceptionsFilter } from './filters/exeptions.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    JwtModule,
  ],
  controllers: [
    AuthController,
    UserController,
    TrackController,
    AlbumController,
    ArtistController,
    FavouritesController,
  ],
  providers: [
    AlbumService,
    ArtistService,
    TrackService,
    UserService,
    FavoriteService,
    PrismaService,
    AuthService,
    LoggingService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionsFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
