import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { TrackController } from './controllers/track.controller';
import { TrackService } from './services/track.service';

@Module({
  imports: [],
  controllers: [TrackController, UserController],
  providers: [TrackService, UserService],
})
export class AppModule {}
