import { IsNumber, IsString } from 'class-validator';
import { IdDto } from './common.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto extends IdDto {
  @IsString()
  login: string;

  @IsNumber()
  version: number;

  @IsNumber()
  createdAt: number;

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
