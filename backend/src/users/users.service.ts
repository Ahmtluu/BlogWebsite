import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  checkPassword(enteredPassword, hashedPassword) {
    return bcrypt.compare(enteredPassword, hashedPassword);
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
          const match = await this.checkPassword(usr.password, user.password);
          if (match) {
            return {
              access_token: this.jwtService.sign({
                sub: user.id,
                username: user.username,
              }),
            };
          } else {
            throw new HttpException(
              'UnauthorizedException',
              HttpStatus.FORBIDDEN,
            );
          }
        } else {
          throw new HttpException('NotFoundException', HttpStatus.NOT_FOUND);
        }
      });
  }

  findAll() {
    return this.userModel.find().exec();
  }

  findOne(id: string) {
    return this.userModel
      .findOne({ id: id })
      .exec()
      .then(async (user) => {
        if (user) {
          const currentUser = {
            userId: user._id,
            username: user.username,
            fullName: user.fullName,
            profileImg: user.profileImg,
            email: user.email,
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
          user.username = usr.username;
          user.fullName = usr.fullName;
          user.email = usr.email;
          user.about = usr.about;

          if (usr.password) {
            const match = this.checkPassword(usr.password, user.password);
            if (match) {
              const password = await this.hashPassword(usr.password);
              user.password = password;
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
    return this.userModel.findOneAndRemove({ _id: id });
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
