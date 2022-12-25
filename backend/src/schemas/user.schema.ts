import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  profileImg:String
  @Prop()
  createdAt!: Date;
  @Prop()
  updatedAt!: Date;
  @Prop()
  username: String;
  @Prop()
  fullName: String;
  @Prop()
  about:String;
  @Prop()
  email: string;
  @Prop()
  password: string;

}

export const UserSchema = SchemaFactory.createForClass(User);
