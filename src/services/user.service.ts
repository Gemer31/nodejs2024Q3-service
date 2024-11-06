import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 } from 'uuid';
import {
  CreateUserDto,
  UpdatePasswordDto,
  UserResponseDto,
} from '../dto/user.dto';
import { IUser } from '../models/user.model';
import { MessageHelper } from '../helpers/message.helper';

@Injectable()
export class UserService {
  private users: Map<string, IUser> = new Map();

  private getResponseDto(user: IUser): UserResponseDto {
    const userDto = { ...user };
    delete userDto?.password;
    return userDto;
  }

  public async getAll(): Promise<UserResponseDto[]> {
    return [...this.users.values()].map(this.getResponseDto);
  }

  public async get(id: string): Promise<UserResponseDto> {
    const user: IUser = this.users.get(id);
    if (!user) {
      throw new NotFoundException(MessageHelper.entityNotFound('User', id));
    }
    return this.getResponseDto(user);
  }

  public async create(data: CreateUserDto): Promise<UserResponseDto> {
    const currentDate: number = +new Date();
    const newUser: IUser = {
      id: v4(),
      version: 1,
      createdAt: currentDate,
      updatedAt: currentDate,
      ...data,
    };
    this.users.set(newUser.id, newUser);

    return this.getResponseDto(newUser);
  }

  public async update(
    id: string,
    { oldPassword, newPassword }: UpdatePasswordDto,
  ): Promise<UserResponseDto> {
    const user = this.users.get(id);

    if (user.password !== oldPassword) {
      throw new ForbiddenException('Old password is incorrect');
    }

    user.password = newPassword;
    user.version += 1;
    user.updatedAt = +new Date();

    return this.getResponseDto(user);
  }

  public async delete(id: string): Promise<void> {
    const user = await this.get(id);
    this.users.delete(user.id);
  }
}
