import { IsBoolean, IsString, IsUUID } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArtistDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsBoolean()
  grammy: boolean;
}

export class UpdateArtistDto extends PartialType(CreateArtistDto) {}

export class ArtistDto extends CreateArtistDto {
  @IsUUID()
  id: string;
}
