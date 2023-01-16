import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Model } from 'mongoose';
import { PostDocument, Post } from '../schemas/post.shema';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async create(createPostDto: CreatePostDto, postCover: string) {
    return await this.postModel
      .findOne({ title: createPostDto.title })
      .exec()
      .then(async (pst) => {
        if (!pst) {
          const newPost = new this.postModel(createPostDto);
          newPost.title = createPostDto.title;
          newPost.content = createPostDto.content;
          if (postCover) {
            newPost.cover = postCover;
          }
          newPost.category = createPostDto.category;
          newPost.author = createPostDto.author;
          newPost.createdAt = new Date();
          newPost.updatedAt = new Date();
          newPost.save();
          return newPost;
        } else {
          return 'PostExist';
        }
      });
  }

  findAll() {
    return this.postModel.find().populate('author').exec();
  }

  findOne(id: string) {
    return this.postModel
      .findOne({ _id: id })
      .populate('author')
      .exec()
      .then(async (post) => {
        if (post) {
          return post;
        } else {
          return "Post doesn't exist!";
        }
      });
  }
  async update(id: string, post: UpdatePostDto, postCover: string) {
    return await this.postModel
      .findOne({ _id: id })
      .exec()
      .then((foundedPost) => {
        if (foundedPost) {
          if (postCover) {
            foundedPost.cover = postCover;
          }
          foundedPost.title = post.title;
          foundedPost.category = post.category;
          foundedPost.updatedAt = new Date();
          foundedPost.content = post.content;
          foundedPost.save();
          return foundedPost;
        } else {
          throw new NotFoundException();
        }
      });
  }

  async remove(id: string) {
    return await this.postModel.findOneAndRemove({ _id: id }).exec();
  }
}
declare global {
  interface Date {
    addMinutes(minutes: number): Date;
  }
}
Date.prototype.addMinutes = function (minutes: number) {
  var copiedDate = new Date(this.getTime());
  return new Date(copiedDate.getTime() + minutes * 60000);
};
