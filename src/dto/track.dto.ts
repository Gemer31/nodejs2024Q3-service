import { IsNumber, IsString, IsUUID, ValidateIf } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTrackDto {
  @ApiProperty()
  @IsString()
  @ValidateIf((_, value) => value !== null)
  name?: string;

  @ApiProperty()
  @IsString()
  @ValidateIf((_, value) => value !== null)
  artistId?: string | null;

  @ApiProperty()
  @IsString()
  @ValidateIf((_, value) => value !== null)
  albumId?: string | null;

  @ApiProperty()
  @IsNumber()
  @ValidateIf((_, value) => value !== null)
  duration?: number;
}

export class TrackDto extends CreateTrackDto {
  @ApiProperty()
  @IsUUID()
  id: string;
}

export class UpdateTrackDto extends PartialType(CreateTrackDto) {}
