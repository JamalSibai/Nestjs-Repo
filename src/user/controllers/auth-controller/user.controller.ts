import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../../guards/api-key.guard';
import { UserInput } from '../../inputs/create.input';
import { UsersService } from '../../user.service';
import { diskStorage } from 'multer';
import path = require('path');
import { v4 as uuidv4 } from 'uuid';

import { AuthControllerUser } from '../../decorators/controller-user.decorator';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ReturnUser } from '../../dto/create-user.dto';

// const getstream = require('into-stream');

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

@ApiTags('User Apis')
@Controller('user')
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
  }),
)
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Post('hello')
  @UseGuards(new JwtAuthGuard())
  async hello() {
    return 'hello';
  }

  @Get(':imgpath')
  @UseGuards(new JwtAuthGuard())
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'get images ' })
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: 'uploads/profileimages' });
  }

  // PROBLEM the image is being uploaded in both conditions
  @Post('upload')
  @UseGuards(new JwtAuthGuard())
  @ApiCreatedResponse({
    description: 'upload images of extension [jpg| jpeg |png|gif]',
  })
  @ApiUnauthorizedResponse({
    description: 'image is not of extension [jpg| jpeg |png|gif]',
  })
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('file', storage))
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
    @AuthControllerUser() user: any,
  ) {
    if (!file || !file.originalname.match(/\.(jpg| jpeg |png|gif)$/)) {
      throw new BadRequestException(
        'invalid file provided, [image files allowed]',
      );
    }

    //to upload the file/image with a stream of data
    // const buffer = file.buffer;

    return this.usersService.updateUser(req.user._id, {
      image: `${file.filename}`,
    });
  }
}
