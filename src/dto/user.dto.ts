import { IsNumber, IsString } from 'class-validator';
import { IdDto } from './common.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto extends IdDto {
  @ApiProperty()
  @IsString()
  login: string;

  @ApiProperty()
  @IsNumber()
  version: number;

  @ApiProperty()
  @IsNumber()
  createdAt: number;

  @ApiProperty()
  @IsNumber()
  updatedAt: number;
}

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  login: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class UpdatePasswordDto {
  @ApiProperty()
  @IsString()
  oldPassword: string;

  @ApiProperty()
  @IsString()
  newPassword: string;
}
