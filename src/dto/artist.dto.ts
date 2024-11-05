import { IsBoolean, IsString, IsUUID } from 'class-validator';

export class ArtistDto {
  @IsUUID()
  id: string;
}

export class CreateArtistDto {
  @IsString()
  name: string;

  @IsBoolean()
  grammy: boolean;
}
