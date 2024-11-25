import { IsArray } from 'class-validator';
import { Album, Artist, Track } from '@prisma/client';

export class FavoritesDto {
  @IsArray()
  artists: Artist[];

  @IsArray()
  albums: Album[];

  @IsArray()
  tracks: Track[];
}
