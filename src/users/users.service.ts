import {
  BanUserDto,
  CreateUserDto,
  UserRole,
  UserStatus,
  ViewUserDto,
} from './dto';
import { randomUUID } from 'node:crypto';

export class UsersService {
  create(data: CreateUserDto): ViewUserDto {
    return {
      ...data,
      id: randomUUID(),
      status: UserStatus.Active,
      createdAt: new Date(),
      createdBy: randomUUID(),
    };
  }

  get(): ViewUserDto[] {
    return [];
  }

  getOne(id: string): ViewUserDto {
    return {
      id,
      status: UserStatus.Active,
      createdAt: new Date(),
      createdBy: randomUUID(),
      firstName: 'One',
      lastName: 'Two',
      email: 'one@example.com',
      role: UserRole.User,
    };
  }

  update(id: string, data: CreateUserDto): ViewUserDto {
    return {
      ...data,
      id,
      status: UserStatus.Active,
      createdAt: new Date(),
      createdBy: randomUUID(),
    };
  }

  ban(id: string, data: BanUserDto): ViewUserDto {
    return {
      id,
      status: data.banned ? UserStatus.Banned : UserStatus.Active,
      createdAt: new Date(),
      createdBy: randomUUID(),
      firstName: 'One',
      lastName: 'Two',
      email: 'one@example.com',
      role: UserRole.User,
    };
  }
}
