import { IsBoolean, IsString, IsUUID } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateArtistDto {
  @IsString()
  name: string;

  @IsBoolean()
  grammy: boolean;
}

export class UpdateArtistDto extends PartialType(CreateArtistDto) {}

export class ArtistDto extends CreateArtistDto {
  @IsUUID()
  id: string;
}
