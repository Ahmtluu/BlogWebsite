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

  hashPassword(data: string) {
    return bcrypt.hash(data, 10);
  }

  checkPassword(userPassword, enteredPassword) {
    return bcrypt.compare(enteredPassword, userPassword);
  }

  async signUp(usr: CreateUserDto) {
    const password = await this.hashPassword(usr.password);
    return await this.userModel
      .findOne({ email: usr.email })
      .exec()
      .then(async (user) => {
        if (user) {
          return 'ExistingUser';
        } else {
          const newUser = new this.userModel(usr);
          newUser.username = usr.username;
          newUser.about = usr.about;
          newUser.profileImg = usr.profileImg;
          newUser.fullName = usr.fullName;
          newUser.email = usr.email;
          newUser.password = password;
          newUser.createdAt = new Date();
          newUser.updatedAt = new Date();
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
          const match = this.checkPassword(usr.password, user.password);
          if (match) {
            return {
              access_token: this.jwtService.sign({
                id: user.id,
                username: user.username,
                profileImage: user.profileImg,
                about: user.about,
              }),
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

  findOne(usrname: string) {
    return this.userModel
      .findOne({ username: usrname })
      .exec()
      .then(async (user) => {
        if (user) {
          const currentUser = {
            username: user.username,
            fullName: user.fullName,
            profileImg: user.profileImg,
            about: user.about,
          };
          return currentUser;
        } else {
          return "User doesn't exist!";
        }
      });
  }

  update(id: string, usr: UpdateUserDto) {
    return this.userModel
      .findOne({ id: id })
      .exec()
      .then(async (user) => {
        if (user) {
          user.updatedAt = new Date();
          user.profileImg = usr.profileImg;
          user.username = usr.username;
          user.fullName = usr.fullName;
          user.email = usr.email;

          if (usr.password) {
            const match = this.checkPassword(usr.password, user.password);
            if (match) {
              user.password = usr.password;
            }
          }
          user.save();
          return user;
        } else {
          return "User doesn't exist!";
        }
      });
  }

  remove(id: string) {
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
