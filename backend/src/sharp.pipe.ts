import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import * as path from 'path';
import * as sharp from 'sharp';

/*ProfileImage Pipe */
@Injectable()
export class ProfileImageSharpPipe
  implements PipeTransform<Express.Multer.File, Promise<string>>
{
  async transform(image: Express.Multer.File): Promise<string> {
    if (image) {
      const filename = Date.now() + '-' + '.webp';

      await sharp(image.buffer)
        .resize(800)
        .webp({ effort: 3 })
        .toFile(path.join('uploads/imagesProfile', filename));

      return filename;
    }
  }
}

/*PostImage Pipe */

@Injectable()
export class PostImageSharpPipe
  implements PipeTransform<Express.Multer.File, Promise<string>>
{
  async transform(image: Express.Multer.File): Promise<string> {
    if (image) {
      const filename = Date.now() + '-' + '.webp';

      await sharp(image.buffer)
        .resize(800)
        .webp({ effort: 3 })
        .toFile(path.join('uploads/imagesPost', filename));

      return filename;
    }
    return;
  }
}
