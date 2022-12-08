import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from './posts/posts.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '/public'),
    }),
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost/posts'),
    PostsModule,
    UsersModule,
  ],
})
export class AppModule {}
