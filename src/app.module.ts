import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { TrackController } from './controllers/track.controller';
import { TrackService } from './services/track.service';
import { ArtistController } from './controllers/artist.controller';
import { ArtistService } from './services/artist.service';

@Module({
  imports: [],
  controllers: [ArtistController, TrackController, UserController],
  providers: [ArtistService, TrackService, UserService],
})
export class AppModule {}
