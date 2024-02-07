import { IsEmail, IsNotEmpty, IsString, Max, Min } from 'class-validator';
import { RegisterData } from '../types/register.type';

export class RegisterDTO implements RegisterData {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
