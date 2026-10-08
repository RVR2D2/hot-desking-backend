import { User } from 'generated/prisma/client';
import { ViewUserDto } from '../dto';
import { mapUserRoleFromDb } from './user-role.mapper';
import { mapUserStatusFromDb } from './user-status.mapper';

export class UserViewMapper {
  mapOne(data: User): ViewUserDto {
    return {
      id: data.id,
      role: mapUserRoleFromDb(data.role),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      status: mapUserStatusFromDb(data.status),
      createdAt: data.createdAt,
      createdBy: data.createdBy,
    };
  }

  mapMany(data: User[]): ViewUserDto[] {
    return data.map((one) => this.mapOne(one));
  }
}
