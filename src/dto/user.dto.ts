import { IsNumber, IsString } from 'class-validator';
import { IdDto } from './common.dto';

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
  @IsString()
  login: string;

  @IsString()
  password: string;
}

export class UpdatePasswordDto {
  @IsString()
  oldPassword: string;

  @IsString()
  newPassword: string;
}
