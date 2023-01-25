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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, memoryStorage } from 'multer';
import { ProfileImageSharpPipe } from 'src/sharp.pipe';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signUp')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.usersService.signUp(createUserDto);
  }

  @Post('/login')
  login(@Body() createUserDto: CreateUserDto) {
    return this.usersService.login(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('profileImg', {
      storage: memoryStorage(),
    }),
  )
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Patch(':id/updatePic')
  updateProfileImage( 
    @Param('id') id: string,
    @UploadedFile(ProfileImageSharpPipe) profileImage: string){
    return this.usersService.updateProfileImage(id,profileImage)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
