import { Module } from '@nestjs/common';
import { EmailModule } from 'src/email';
import { PasswordResetService } from './password-reset.service';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [ProfileController, UsersController],
  providers: [ProfileService, UsersService, PasswordResetService],
  exports: [ProfileService],
  imports: [EmailModule],
})
export class UsersModule {}
