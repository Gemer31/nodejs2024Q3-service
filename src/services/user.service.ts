import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateUserDto,
  UpdatePasswordDto,
  UserResponseDto,
} from '../dto/user.dto';
import { IUser } from '../models/user.model';
import { MessageHelper } from '../helpers/message.helper';
import { PrismaService } from './prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  public getUserResponseDto(user): UserResponseDto {
    delete user?.password;
    return {
      ...user,
      createdAt: +new Date(user.createdAt),
      updatedAt: +new Date(user.updatedAt),
    };
  }

  public async getAll() {
    return (await this.prisma.user.findMany()) as unknown as IUser[];
  }

  public async get(id: string) {
    const user = (await this.prisma.user.findUnique({
      where: { id },
    })) as unknown as IUser;
    if (!user) {
      throw new NotFoundException(MessageHelper.entityNotFound('User', id));
    }
    return user;
  }

  public async create(data: CreateUserDto) {
    return (await this.prisma.user.create({
      data: { ...data, version: 1 },
    })) as unknown as IUser;
  }

  public async updatePassword(
    id: string,
    { oldPassword, newPassword }: UpdatePasswordDto,
  ) {
    const user = await this.get(id);

    if (user.password !== oldPassword) {
      throw new ForbiddenException('Old password is incorrect');
    }

    return (await this.prisma.user.update({
      where: { id },
      data: { password: newPassword, version: user.version + 1 },
    })) as unknown as IUser;
  }

  public async delete(id: string) {
    const user = await this.get(id);
    return this.prisma.user.delete({ where: { id: user.id } });
  }
}
