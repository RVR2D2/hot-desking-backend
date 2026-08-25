import { AccessDTO, LoginDTO } from './dto';
import { Injectable } from '@nestjs/common';
import { ProfileService } from '../users/profile.service';
import { randomUUID } from 'node:crypto';

@Injectable()
export class AuthService {
  constructor(private readonly profileService: ProfileService) {}

  login(data: LoginDTO): AccessDTO {
    const id = randomUUID();
    const profile = this.profileService.getSelf(id);
    return { ...profile, token: 'hello' };
  }
}
