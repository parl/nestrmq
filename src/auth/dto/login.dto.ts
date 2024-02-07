import { IsEmail, IsNotEmpty, IsString, Max, Min } from 'class-validator';
import { LoginData } from '../types/login.type';

export class LoginDTO implements LoginData {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
