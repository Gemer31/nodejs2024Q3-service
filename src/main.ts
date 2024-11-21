import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { ArtistDto } from './dto/artist.dto';
import { FavoritesDto } from './dto/favoritesDto';
import { TrackDto } from './dto/track.dto';
import { AlbumDto } from './dto/album.dto';

const PORT = process.env.NEST_APP_PORT ?? 4000;

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
    .addBearerAuth(
      {
        // I was also testing it without prefix 'Bearer ' before the JWT
        description: `[just text field] Please enter token in following format: Bearer <JWT>`,
        name: 'Authorization',
        bearerFormat: 'Bearer', // I`ve tested not to use this field, but the result was the same
        scheme: 'Bearer',
        type: 'http', // I`ve attempted type: 'apiKey' too
        in: 'Header'
      },
      'access-token', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .addSecurityRequirements('ApiKeyAuth')
    .build();
  const documentFactory = () =>
    SwaggerModule.createDocument(app, config, {
      extraModels: [UserDto, ArtistDto, FavoritesDto, TrackDto, AlbumDto],
    });
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(PORT);
}

bootstrap();
