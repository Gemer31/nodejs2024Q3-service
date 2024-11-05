import { IsNumber, IsString } from 'class-validator';

export class User {
  @IsString()
  id: string; // uuid v4

  @IsString()
  login: string;

  @IsString()
  password: string;

  @IsNumber()
  version: number; // integer number, increments on update

  @IsNumber()
  createdAt: number; // timestamp of creation

  @IsNumber()
  updatedAt: number; // timestamp of last update
}

export class CreateUserDto {
  @IsString()
  login: string;

  @IsString()
  password: string;
}

export class UpdatePasswordDto {
  @IsString()
  oldPassword: string; // previous password

  @IsString()
  newPassword: string; // new password
}
