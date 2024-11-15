import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UserResponseDto } from "./dto/user.dto";
import { ArtistDto } from "./dto/artist.dto";
import { FavoritesDto } from "./dto/favoritesDto";
import { TrackDto } from "./dto/track.dto";
import { AlbumDto } from "./dto/album.dto";

const PORT = process.env.PORT ?? 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home music library service')
    .setVersion('1.0.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config, {
    extraModels: [UserResponseDto, ArtistDto, FavoritesDto, TrackDto, AlbumDto],
  });
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(PORT);
}

bootstrap();
