import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop()
  cover: string;

  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  createdBy: string;

  @Prop()
  createdDate: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
