import { IsNumber, IsString, IsUUID, ValidateIf } from 'class-validator';

export class AlbumDto {
  @IsUUID()
  id: string;
}

export class CreateAlbumDto {
  @IsString()
  name: string;

  @IsNumber()
  year: number;

  @IsString()
  @ValidateIf((_, value) => value !== null)
  artistId: string | null; // refers to Artist
}
