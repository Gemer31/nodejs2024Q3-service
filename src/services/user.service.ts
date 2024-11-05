import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 } from 'uuid';
import { CreateUserDto, UpdatePasswordDto, User } from '../dto/user.dto';

@Injectable()
export class UserService {
  private users: Map<string, User> = new Map();

  public async getAll(): Promise<User[]> {
    return [...this.users.values()];
  }

  public async get(id: string): Promise<User> {
    const user: User = this.users.get(id);
    if (!user) {
      throw new NotFoundException(`User with id=${id} is not found`);
    }
    return this.users.get(id);
  }

  public async create({ login, password }: CreateUserDto): Promise<User> {
    const currentDate: number = +new Date();
    const newUser: User = {
      id: v4(),
      login,
      password,
      version: 1,
      createdAt: currentDate,
      updatedAt: currentDate,
    };
    this.users.set(newUser.id, newUser);

    return newUser;
  }

  public async update(
    id: string,
    { oldPassword, newPassword }: UpdatePasswordDto,
  ): Promise<User> {
    const user = await this.get(id);

    if (user.password !== oldPassword) {
      throw new ForbiddenException('Old password is incorrect');
    }

    user.password = newPassword;
    return user;
  }

  public async delete(id: string): Promise<void> {
    const user = await this.get(id);
    this.users.delete(user.id);
  }
}
