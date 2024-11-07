import { IsNumber, IsString, IsUUID, ValidateIf } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateAlbumDto {
  @IsString()
  name: string;

  @IsNumber()
  year: number;

  @IsString()
  @ValidateIf((_, value) => value !== null)
  artistId: string | null;
}

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {}

export class AlbumDto extends CreateAlbumDto {
  @IsUUID()
  id: string;
}
