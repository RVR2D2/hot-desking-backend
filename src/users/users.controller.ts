import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { IdParamDto } from './common';
import { BanUserDto, CreateUserDto, ViewUserDto } from './dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() data: CreateUserDto): Promise<ViewUserDto> {
    return this.usersService.create(data);
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
