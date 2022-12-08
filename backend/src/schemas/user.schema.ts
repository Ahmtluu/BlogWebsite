import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
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
  hash: string;
  @Prop()
  hashedRT: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
