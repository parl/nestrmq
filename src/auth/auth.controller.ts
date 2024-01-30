import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerData: RegisterDTO) {
    return await this.authService.register({ ...registerData });
  }

  @Post('login')
  async login(@Body() loginData: LoginDTO) {
    return await this.authService.login({ ...loginData });
  }
}
