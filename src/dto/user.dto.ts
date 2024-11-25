import { IsNumber, IsString } from 'class-validator';
import { IdDto } from './common.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { User } from '@prisma/client';

export class UserDto extends IdDto {
  @ApiProperty()
  @IsString()
  login: string;

  @ApiProperty()
  @IsNumber()
  version: number;

  @ApiProperty()
  @IsString()
  @Exclude()
  password: string;

  @ApiProperty()
  @IsNumber()
  createdAt: number;

  @ApiProperty()
  @IsNumber()
  updatedAt: number;

  constructor(user: User) {
    super();

    this.id = user.id;
    this.login = user.login;
    this.password = user.password;
    this.version = user.version;
    this.createdAt = +user.createdAt;
    this.updatedAt = +user.updatedAt;
  }
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

export class AuthUserDto {
  @ApiProperty({ description: "The user's login", required: true })
  login: string;

  @ApiProperty({ description: "The user's password", required: true })
  password: string;
}

export class RefreshTokenDto {
  @ApiProperty({ description: 'Refresh token', required: true })
  refreshToken: string;
}
