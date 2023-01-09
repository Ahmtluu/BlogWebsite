import { User } from 'src/schemas/user.schema';

export class CreatePostDto {
  cover: string;
  title: string;
  category: string;
  creatorName:string;
  creatorProfileImage:string
  createdAt: Date;
  updatedAt:Date;
  content: any;
}
