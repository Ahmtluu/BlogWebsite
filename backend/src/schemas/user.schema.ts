import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Post } from './post.shema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ default: '' })
  profileImg: string;

  @Prop()
  createdAt!: Date;

  @Prop()
  updatedAt!: Date;

  @Prop()
  username: string;

  @Prop({ default: '' })
  description: string;

  @Prop()
  fullName: string;

  @Prop()
  email: string;

  @Prop()
  password: String;
}

export const UserSchema = SchemaFactory.createForClass(User);
