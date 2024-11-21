import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { PUBLIC_METADATA_KEY } from '../decorators/public.handler';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const request: Request = ctx.switchToHttp().getRequest();
    const isPublicHandler = this.reflector.getAllAndOverride<boolean>(
      PUBLIC_METADATA_KEY,
      [ctx.getHandler(), ctx.getClass()],
    );

    if (isPublicHandler) return true;

    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    // const token = type === 'Bearer' ? token : undefined;

    if (!token) throw new UnauthorizedException();

    try {
      request['user'] = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_SECRET_REFRESH_KEY'),
      });
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
