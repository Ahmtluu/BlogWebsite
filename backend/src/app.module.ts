import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from './posts/posts.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '/uploads'),
    }),
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: join(__dirname, '..', '/public'),
      }),
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    PostsModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}

console.log();
