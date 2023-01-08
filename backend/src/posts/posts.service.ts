import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Model } from 'mongoose';
import { PostDocument, Post } from '../schemas/post.shema';


@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async create(pst: CreatePostDto, postCover:Express.Multer.File) {
    return await this.postModel
      .findOne({ title: pst.title })
      .exec()
      .then(async (post) => {
        if (!post) {
          const newPost = new this.postModel(post);
          newPost.title = pst.title;
          newPost.content = pst.content;
          if(postCover){
            newPost.cover = postCover.filename;
          }
          newPost.category = pst.category;
          newPost.creatorName=pst.creatorName
          newPost.creatorProfileImage=pst.creatorProfileImage;
          newPost.createdDate = new Date();
          newPost.save();
          return newPost;
        } else {
          return 'PostExist';
        }
      });
  }

  findAll() {
    return this.postModel.find().exec();
  }

  findOne(id: string) {
    return this.postModel
      .findOne({ _id: id })
      .exec()
      .then(async (post) => {
        if (post) {
          return post;
        } else {
          return "User doesn't exist!";
        }
      });
  }
  async update(id: string, post: UpdatePostDto,postCover:Express.Multer.File) {
    return await this.postModel
      .findOne({ _id: id })
      .exec()
      .then((foundedPost) => {
        if (foundedPost) {
          if(postCover){
            foundedPost.cover =  postCover.filename;;
          }
          foundedPost.title = post.title;
          foundedPost.creatorName=post.creatorName
          foundedPost.creatorProfileImage=post.creatorProfileImage;
          foundedPost.createdDate = post.createdDate;
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
