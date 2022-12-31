import { User } from 'src/schemas/user.schema';
export class Post {
    cover: string;
    title: string;
    category: string;
    createdBy: User;
    createdDate: Date;
    content: string;
}
