import { IsNumber, IsString } from 'class-validator';
import { IdDto } from './common.dto';
import { ApiExtraModels, ApiProperty, ApiSchema } from "@nestjs/swagger";

@ApiSchema({ name: 'User' })
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

@ApiSchema({ name: 'CreateUser' })
export class CreateUserDto {
  @ApiProperty()
  @IsString()
  login: string;

  @ApiProperty()
  @IsString()
  password: string;
}

@ApiSchema({ name: 'UpdatePassword' })
export class UpdatePasswordDto {
  @ApiProperty()
  @IsString()
  oldPassword: string;

  @ApiProperty()
  @IsString()
  newPassword: string;
}
