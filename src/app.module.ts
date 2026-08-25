import { Module } from '@nestjs/common';
import { UsersModule } from './users';
import { AuthModule } from './auth';

@Module({
  imports: [UsersModule, AuthModule],
})
export class AppModule {}
