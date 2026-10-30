import { Injectable, UnauthorizedException } from '@nestjs/common';
import { config, Hasher } from 'src/common';
import { PrismaService } from 'src/prisma';
import { UserStatus } from 'src/users/dto';
import { mapUserRoleFromDb, mapUserStatusFromDb } from 'src/users/mappers';
import { ProfileService } from '../users/profile.service';
import { AccessDTO, LoginDataDto, LoginDTO } from './dto';
import { UserJWT } from './models';

const ERROR_MESSAGE = 'Wrong email or password';

@Injectable()
export class AuthService {
  private readonly jwt = new UserJWT(
    config.jwt.secret,
    config.jwt.expirationSeconds,
  );

  constructor(
    private readonly prismaService: PrismaService,
    private readonly profileService: ProfileService,
  ) {}

  public async login(data: LoginDTO): Promise<AccessDTO> {
    const user = await this.retrieveForLogin(data.email);
    this.checkLoginPermission(user);

    const match = await Hasher.verify(user.hash, data.password);

    if (!match) {
      throw new UnauthorizedException(ERROR_MESSAGE);
    }

    const token = await this.jwt.sign(user.id, user.role);
    const profile = await this.profileService.getSelf(user.id);

    return {
      ...profile,
      token,
    };
  }

  private async retrieveForLogin(email: string): Promise<LoginDataDto> {
    const data = await this.prismaService.user.findFirst({
      where: { email: { equals: email, mode: 'insensitive' } },
      select: {
        id: true,
        hash: true,
        role: true,
        status: true,
      },
    });

    if (!data || !data.hash) {
      throw new UnauthorizedException(ERROR_MESSAGE);
    }

    return {
      id: data.id,
      hash: data.hash,
      role: mapUserRoleFromDb(data.role),
      status: mapUserStatusFromDb(data.status),
    };
  }

  private checkLoginPermission(user: LoginDataDto): void {
    if (user.status !== UserStatus.Active) {
      throw new UnauthorizedException(ERROR_MESSAGE);
    }
  }
}
