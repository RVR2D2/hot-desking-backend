import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AccessGuard } from 'src/common/guards';

import type { JWTUser } from 'src/auth/models';
import { Roles, User } from 'src/common';
import { IdParamDto } from 'src/common/dto/id-param.dto';
import { BanUserDto, CreateUserDto, UserRole, ViewUserDto } from './dto';
import { UsersService } from './users.service';

@Controller('users')
@Roles(UserRole.Admin)
@UseGuards(AccessGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(
    @User() user: JWTUser,
    @Body() data: CreateUserDto,
  ): Promise<ViewUserDto> {
    return this.usersService.create(data, user.userId);
  }

  @Get()
  async get(): Promise<ViewUserDto[]> {
    return this.usersService.get();
  }

  @Get(':id')
  async getOne(@Param() { id }: IdParamDto): Promise<ViewUserDto> {
    return this.usersService.getOne(id);
  }

  @Put(':id')
  async update(
    @Param() { id }: IdParamDto,
    @Body() data: CreateUserDto,
  ): Promise<ViewUserDto> {
    return this.usersService.update(id, data);
  }

  @Post(':id/ban')
  async ban(
    @Param() { id }: IdParamDto,
    @Body() data: BanUserDto,
  ): Promise<ViewUserDto> {
    return this.usersService.ban(id, data);
  }
}
