import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async signUp(usr: CreateUserDto) {
    const password = await this.hashData(usr.hash);
    return await this.userModel
      .findOne({ email: usr.email })
      .exec()
      .then(async (user) => {
        if (user) {
          return 'ExistingUser';
        } else {
          const newUser = new this.userModel(usr);
          newUser.createdAt = new Date();
          newUser.updatedAt = new Date();
          newUser.username = usr.username;
          newUser.fullName = usr.fullName;
          newUser.email = usr.email;
          newUser.hash = password;
          newUser.hashedRT = usr.hashedRT;
          newUser.save();
          return newUser;
        }
      });
  }

  async login(usr: CreateUserDto) {
    return this.userModel
      .findOne({ email: usr.email })
      .exec()
      .then(async (user) => {
        if (user) {
          const match = await bcrypt.compare(usr.hash, user.hash);
          if (match) {
            const payload = { username: user.username };
            return {
              access_token: this.jwtService.sign(payload),
            };
          } else {
            return 'Error';
          }
        } else {
          return 'User not found';
        }
      });
  }

  findAll() {
    return this.userModel.find().exec();
  }

  findOne(id: number) {
    return this.userModel.findOne({ id: id }).exec();
  }

  update(id: number, usr: UpdateUserDto) {
    return this.userModel
      .findOne({ id: id })
      .exec()
      .then(async (user) => {
        if (user) {
          user.updatedAt = new Date();
          user.username = usr.username;
          user.fullName = usr.fullName;
          user.email = usr.email;
          user.hash = usr.hash;
          user.hashedRT = usr.hashedRT;
          user.save();
          return user;
        } else {
          return "User doesn't exist!";
        }
      });
  }

  remove(id: number) {
    return this.userModel.findOneAndRemove({ id: id });
  }
}

declare global {
  interface Date {
    addMinutes(minutes: number): Date;
  }
}
Date.prototype.addMinutes = function (minutes: number) {
  var copiedDate = new Date(this.getTime());
  return new Date(copiedDate.getTime() + minutes * 60000);
};
