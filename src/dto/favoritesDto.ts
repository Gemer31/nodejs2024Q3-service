import { IsArray } from 'class-validator';
import { ApiSchema } from '@nestjs/swagger';
import { Album, Artist, Track } from '@prisma/client';

@ApiSchema({ name: 'Favorites' })
export class FavoritesDto {
  @IsArray()
  artists: Artist[];

  @IsArray()
  albums: Album[];

  @IsArray()
  tracks: Track[];
}
