import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  AuthUserDto,
  CreateUserDto,
  RefreshTokenDto,
} from '../dto/user.dto';
import { TokensDto } from '../dto/tokens.dto';
import { hashSync, compareSync } from 'bcrypt';
import { UserService } from './user.service';
import { IJwtVerify } from '../models/jwt.model';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private usersService: UserService,
  ) {}

  public async signup({ login, password }: CreateUserDto): Promise<User> {
    const hash: string = hashSync(
      password,
      parseInt(this.configService.get('CRYPT_SALT'), 10),
    );

    return await this.usersService.create({ login, password: hash });
  }

  public async login({ login, password }: AuthUserDto): Promise<TokensDto> {
    const users = await this.usersService.getAll({ login });
    const user = users?.find((user) => compareSync(password, user.password));

    if (!user) {
      throw new ForbiddenException('Invalid login or password');
    }

    return this.getTokens({ userId: user.id, login: user.login });
  }

  async refresh({ refreshToken }: RefreshTokenDto): Promise<TokensDto> {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is not specified');
    }

    try {
      const IJwtVerify: IJwtVerify = this.jwtService.verify(refreshToken, {
        secret: this.configService.get('JWT_SECRET_REFRESH_KEY'),
      });

      return this.getTokens(IJwtVerify);
    } catch {
      throw new ForbiddenException('Refresh token is invalid or expired');
    }
  }

  private getTokens(payload: IJwtVerify): TokensDto {
    return {
      accessToken: this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_SECRET_KEY'),
        expiresIn: this.configService.get('TOKEN_EXPIRE_TIME'),
      }),
      refreshToken: this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_SECRET_REFRESH_KEY'),
        expiresIn: this.configService.get('TOKEN_REFRESH_EXPIRE_TIME'),
      }),
    };
  }
}
