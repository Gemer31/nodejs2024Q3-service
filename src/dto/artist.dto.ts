import { IsBoolean, IsString, IsUUID } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiSchema } from "@nestjs/swagger";

@ApiSchema({ name: 'CreateArtis' })
export class CreateArtistDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsBoolean()
  grammy: boolean;
}

export class UpdateArtistDto extends PartialType(CreateArtistDto) {}

@ApiSchema({ name: 'Artist' })
export class ArtistDto extends CreateArtistDto {
  @ApiProperty()
  @IsUUID()
  id: string;
}
