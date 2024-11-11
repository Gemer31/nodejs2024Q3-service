import { IsNumber, IsString, IsUUID, ValidateIf } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiSchema } from "@nestjs/swagger";

export class CreateAlbumDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  year: number;

  @ApiProperty()
  @IsString()
  @ValidateIf((_, value) => value !== null)
  artistId: string | null;
}

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {}

@ApiSchema({ name: 'Album' })
export class AlbumDto extends CreateAlbumDto {
  @IsUUID()
  id: string;
}
