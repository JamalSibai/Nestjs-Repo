import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  Res,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from './guards/api-key.guard';
import { UserInput } from './inputs/create.input';
import { UsersService } from './user.service';
import { diskStorage } from 'multer';
import path = require('path');
import { v4 as uuidv4 } from 'uuid';
import { CurrentUser } from './decorators/user.decorator';
import { Types } from 'mongoose';

export const storage = {
  storage: diskStorage({
    destination: './uploads/profileimages',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

@Controller('user')
// @UseGuards(AuthGuard())
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Post('hello')
  @UseGuards(new JwtAuthGuard())
  async hello(@CurrentUser() user: { _id: string; email: string }) {
    console.log(user);
    return 'hello';
  }
  @Post()
  @UseGuards(new JwtAuthGuard())
  async createUser(@Body() input: UserInput) {
    return await this.usersService.createUser(input);
  }

  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: 'uploads/profileimages' });
  }

  // @Post('upload')
  // @UseGuards(new JwtAuthGuard())
  // @UseInterceptors(FileInterceptor('file', storage))
  // uploadFile(
  //   @CurrentUser() user: { _id: Types.ObjectId; email: string },
  //   @UploadedFile() file,
  //   @Request() req,
  // ) {
  //   console.log('user');
  //   console.log(user);
  //   return this.usersService.updateUser(user._id, { image: file.filename });
  //   // return { filename: file.filename };
  // }
}
