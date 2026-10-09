import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ResetPasswordDTO, SetPasswordDTO, ViewProfileDTO } from './dto';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  getProfile(): ViewProfileDTO {
    return this.profileService.getSelf(randomUUID());
  }

  @Post('reset')
  @HttpCode(HttpStatus.NO_CONTENT)
  resetPassword(@Body() { email }: ResetPasswordDTO): Promise<void> {
    return this.profileService.resetPassword(email);
  }

  @Post('password')
  @HttpCode(HttpStatus.NO_CONTENT)
  setPassword(@Body() data: SetPasswordDTO): Promise<void> {
    return this.profileService.setPassword(data);
  }
}
