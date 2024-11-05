import { IsNumber, IsString, IsUUID, ValidateIf } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateTrackDto {
  @IsString()
  @ValidateIf((_, value) => value !== null)
  name?: string;

  @IsString()
  @ValidateIf((_, value) => value !== null)
  artistId?: string | null;

  @IsString()
  @ValidateIf((_, value) => value !== null)
  albumId?: string | null;

  @IsNumber()
  @ValidateIf((_, value) => value !== null)
  duration?: number;
}

export class TrackDto extends CreateTrackDto {
  @IsUUID()
  id: string;
}

export class UpdateTrackDto extends PartialType(CreateTrackDto) {}
