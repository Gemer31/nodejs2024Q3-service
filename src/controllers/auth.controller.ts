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
import { ApiLoginOperationDecorator } from '../decorators/api-operations/api-login-operation.decorator';
import { TokensDto } from '../dto/tokens.dto';
import { ApiRefreshTokensOperationDecorator } from '../decorators/api-operations/api-refresh-tokens-operation.decorator';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @PublicHandler()
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    const user = await this.authService.signup(createUserDto);
    return new UserDto(user);
  }

  @PublicHandler()
  @ApiLoginOperationDecorator(['auth'])
  @Post('login')
  async login(@Body() authUserDto: AuthUserDto): Promise<TokensDto> {
    return await this.authService.login(authUserDto);
  }

  @ApiRefreshTokensOperationDecorator(['auth'])
  @Post('refresh')
  async refresh(@Body() refreshTokenDto: RefreshTokenDto): Promise<TokensDto> {
    return await this.authService.refresh(refreshTokenDto);
  }
}
