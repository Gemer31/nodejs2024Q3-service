import { IsArray } from 'class-validator';
import { ArtistDto } from './artist.dto';
import { AlbumDto } from './album.dto';
import { TrackDto } from './track.dto';
import { ApiSchema } from "@nestjs/swagger";

@ApiSchema({ name: 'Favorites' })
export class FavoritesDto {
  @IsArray()
  artists: ArtistDto[];

  @IsArray()
  albums: AlbumDto[];

  @IsArray()
  tracks: TrackDto[];
}
