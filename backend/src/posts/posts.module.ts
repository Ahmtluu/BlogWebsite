import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { PostSchema, Post } from 'src/schemas/post.shema';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    MulterModule.register({
      dest: './uploads/postImages',
    }),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
