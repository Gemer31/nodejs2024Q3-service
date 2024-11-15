import { IsNumber, IsString, IsUUID, ValidateIf } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiSchema } from "@nestjs/swagger";

@ApiSchema({ name: 'CreateTrack' })
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

@ApiSchema({ name: 'Track' })
export class TrackDto extends CreateTrackDto {
  @ApiProperty()
  @IsUUID()
  id: string;
}

@ApiSchema({ name: 'UpdateTrack' })
export class UpdateTrackDto extends PartialType(CreateTrackDto) {}
