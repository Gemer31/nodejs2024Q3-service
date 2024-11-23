import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { ArtistDto } from './dto/artist.dto';
import { FavoritesDto } from './dto/favoritesDto';
import { TrackDto } from './dto/track.dto';
import { AlbumDto } from './dto/album.dto';
import { ConfigService } from '@nestjs/config';
import { LoggingService } from './services/logging.service';
import { Request, Response, NextFunction } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('NEST_APP_PORT') || 4000;
  const loggingService = app.get(LoggingService);

  app.useLogger(loggingService);

  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home music library service')
    .setVersion('1.0.0')
    // .addBearerAuth(
    //   {
    //     // I was also testing it without prefix 'Bearer ' before the JWT
    //     description: `[just text field] Please enter token in following format: Bearer <JWT>`,
    //     name: 'Authorization',
    //     bearerFormat: 'JWT', // I`ve tested not to use this field, but the result was the same
    //     scheme: 'bearer',
    //     type: 'http', // I`ve attempted type: 'apiKey' too
    //     in: 'Header'
    //   },
    //   'access-token', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    // )
    // .addSecurityRequirements('ApiKeyAuth')
    .build();
  const documentFactory = () =>
    SwaggerModule.createDocument(app, config, {
      extraModels: [UserDto, ArtistDto, FavoritesDto, TrackDto, AlbumDto],
    });
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(PORT);

  app.use((req: Request, res: Response, next: NextFunction) => {
    const { method, originalUrl, query, body } = req;

    res.on('finish', () => {
      loggingService.log(
        `${method} ${originalUrl} ${JSON.stringify(query)} ${JSON.stringify(
          body,
        )} - ${res.statusCode}`,
      );
    });
    next();
  });

  process.on('uncaughtException', (e: Error) => {
    Logger.error('Uncaught Exception:', e.message);
  });

  process.on('unhandledRejection', (reason, promise) => {
    Logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  });
}

bootstrap();
