import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AccessDTO, LoginDTO } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiCreatedResponse({ type: AccessDTO, description: 'Login successful' })
  @ApiBadRequestResponse({ description: 'Wrong input' })
  @ApiUnauthorizedResponse({ description: 'Wrong email or password' })
  login(@Body() loginDto: LoginDTO): Promise<AccessDTO> {
    return this.authService.login(loginDto);
  }
}
