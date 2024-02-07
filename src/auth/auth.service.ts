import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument, UserSchema } from 'src/schemas/user.schema';
import { RegisterData } from './types/register.type';
import { LoginData } from './types/login.type';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface TokenResponse {
  token: string;
  expiredDate: Date;
  success: boolean;
}

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async register(register: RegisterData): Promise<any> {
    const salt = 10;
    register.password = bcrypt.hashSync(register.password, salt);
    console.log(register);
    const user = new this.userModel(register);
    user.save();
  }

  async login(loginData: LoginData) {
    const user = this.userModel
      .findOne({ email: loginData.email })
      .then((user) => {
        if (!user) {
          throw {
            errors: {
              message: 'user not found',
              success: false,
            },
          };
        }

        if (!bcrypt.compareSync(loginData.password, user.password)) {
          return {
            errors: {
              message: 'wrong password',
              success: false,
            },
          };
        }

        const payload = {
          email: user.email,
          id: user._id,
        };

        const token = jwt.sign(payload, process.env.SECRET_KEY, {
          expiresIn: '1d',
        });

        return {
          result: {
            token: token,
            success: true,
          },
        };
      });
  }
}
