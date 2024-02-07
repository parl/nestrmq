import { Body, Controller, Get, Injectable, Post, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { LoginData } from './types/login.type';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerData: RegisterDTO) {
    try {
      await this.authService.register({ ...registerData });
    } catch (e) {
      console.log(e);
    }
  }

  @Post('login')
  async login(@Body() loginData: LoginDTO) {
    return await this.authService.login({ ...loginData });
  }

  @Get('me')
  async me(@Body() loginData: LoginData) {
    return await this.authService.login({ ...loginData });
  }
}
