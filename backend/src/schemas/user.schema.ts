import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Post } from './post.shema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  profileImg: String;
  @Prop()
  createdAt!: Date;
  @Prop()
  updatedAt!: Date;
  @Prop()
  username: String;
  @Prop()
  fullName: String;
  @Prop()
  email: string;
  @Prop()
  password: string;
  @Prop()
  about: String;
}

export const UserSchema = SchemaFactory.createForClass(User);
