import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Model } from 'mongoose';
import { PostDocument, Post } from '../schemas/post.shema';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async create(pst: CreatePostDto) {
    return this.postModel
      .findOne({ title: pst.title })
      .exec()
      .then(async (post) => {
        if (!post) {
          const newPost = new this.postModel(post);
          newPost.cover = pst.cover;
          newPost.title = pst.title;
          newPost.createdBy = pst.createdBy;
          newPost.createdDate = new Date();
          newPost.content = pst.content;
          newPost.save();
        } else {
          return 'PostExist';
        }
      });
  }

  findAll() {
    return this.postModel.find().exec();
  }

  findOne(id: number) {
    return this.postModel.findOne({ id: id }).exec();
  }

  update(id: number, post: UpdatePostDto) {
    this.postModel
      .findOne({ id: id })
      .exec()
      .then((foundedPost) => {
        if (foundedPost) {
          foundedPost.cover = post.cover;
          foundedPost.title = post.title;
          foundedPost.createdBy = post.createdBy;
          foundedPost.createdDate = post.createdDate;
          foundedPost.content = post.content;
          foundedPost.save();
          return foundedPost;
        } else {
          throw new NotFoundException();
        }
      });
  }

  remove(id: number) {
    return this.postModel.findOneAndRemove({ id: id }).exec();
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
