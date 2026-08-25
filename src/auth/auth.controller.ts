import { Body, Controller } from '@nestjs/common';
import { AccessDTO, LoginDTO } from './dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  login(@Body() loginDto: LoginDTO): AccessDTO {
    return this.authService.login(loginDto);
  }
}
