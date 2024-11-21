import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { PublicHandler } from '../decorators/public.handler';
import {
  AuthUserDto,
  CreateUserDto,
  RefreshTokenDto,
  UserDto,
} from '../dto/user.dto';
import { ApiLoginOperation } from '../decorators/api-login.operation';
import { TokensDto } from '../dto/tokens.dto';
import { ApiRefreshTokensOperation } from '../decorators/api-refresh-tokens.operation';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @PublicHandler()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    const user = await this.authService.signup(createUserDto);
    return new UserDto(user);
  }

  @PublicHandler()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiLoginOperation(['auth'])
  @Post('login')
  async login(@Body() authUserDto: AuthUserDto): Promise<TokensDto> {
    return await this.authService.login(authUserDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @ApiRefreshTokensOperation(['auth'])
  @Post('refresh')
  async refresh(@Body() refreshTokenDto: RefreshTokenDto): Promise<TokensDto> {
    return await this.authService.refresh(refreshTokenDto);
  }
}
