import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop()
  cover: string;
  @Prop()
  title: string;
  @Prop()
  category: string;
  @Prop()
  content: string;
  @Prop()
  createdBy: User
  @Prop()
  createdDate: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
