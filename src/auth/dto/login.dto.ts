import { IsEmail, IsNotEmpty, IsString, Max, Min } from 'class-validator';
import { LoginData } from '../types/login.type';

export class LoginDTO implements LoginData {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Min(8)
  @Max(32)
  password: string;
}
