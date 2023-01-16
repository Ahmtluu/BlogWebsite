import { User } from 'src/schemas/user.schema';

export class CreatePostDto {
  cover: string;
  title: string;
  category: string;
  author: User;
  content: any;
  createdAt: Date;
  updatedAt: Date;
}
