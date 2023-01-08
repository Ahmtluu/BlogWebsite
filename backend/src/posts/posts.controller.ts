import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';


export const storage = {
 

}

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('cover',{ storage: diskStorage({
    destination: './uploads/postImages'
})}))
  create(@Body() createPostDto: CreatePostDto, @UploadedFile() file: Express.Multer.File) {
    return this.postsService.create(createPostDto, file);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('cover',{storage: diskStorage({
    destination: './uploads/postImages'
  }),}))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto,@UploadedFile() file: Express.Multer.File) {
    return this.postsService.update(id, updatePostDto,file);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
