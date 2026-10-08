import { Module } from '@nestjs/common';
import { AuthModule } from './auth';
import { PrismaModule } from './prisma';
import { UsersModule } from './users';

@Module({
  imports: [UsersModule, AuthModule, PrismaModule],
})
export class AppModule {}
