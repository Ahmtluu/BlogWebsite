import { User } from 'src/schemas/user.schema';

export class CreatePostDto {
  cover: string;
  title: string;
  category: string;
  createdBy: User;
  createdDate: Date;
  content: any;
}
