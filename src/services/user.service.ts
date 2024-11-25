import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto, UserDto } from '../dto/user.dto';
import { MessageHelper } from '../helpers/message.helper';
import { PrismaService } from './prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  public async getAll({ login }: { login?: string } = {}): Promise<User[]> {
    return this.prisma.user.findMany({
      where: login ? { login } : {},
    });
  }

  public async get(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(MessageHelper.entityNotFound('User', id));
    }

    return user;
  }

  public async create(data: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: { ...data, version: 1 },
    });
  }

  public async updatePassword(
    id: string,
    { oldPassword, newPassword }: UpdatePasswordDto,
  ): Promise<User> {
    const user = await this.get(id);

    if (user.password !== oldPassword) {
      throw new ForbiddenException('Old password is incorrect');
    }

    return this.prisma.user.update({
      where: { id },
      data: { password: newPassword, version: user.version + 1 },
    });
  }

  public async delete(id: string) {
    const user = await this.get(id);
    return this.prisma.user.delete({ where: { id: user.id } });
  }
}
