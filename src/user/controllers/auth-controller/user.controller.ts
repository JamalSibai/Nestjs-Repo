import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
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
import { UsersService } from '../../user.service';

import { AuthControllerUser } from '../../decorators/controller-user.decorator';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SentryInterceptor } from 'src/user/interceptors/sentry.interceptor';
import * as Sentry from '@sentry/node';
import { ImageUploader } from 'src/helpers/image.helper';

@ApiTags('User Apis')
@UseInterceptors(SentryInterceptor)
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
    // Sentry.captureException('hello');
    // throw new InternalServerErrorException();
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
  @UseInterceptors(FileInterceptor('file', ImageUploader))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
    @AuthControllerUser() user: any,
  ) {
    console.log(file);
    if (!file) {
      throw new BadRequestException('wrong file extension ');
    }
    return this.usersService.updateUser(req.user._id, {
      image: `${file.filename}`,
    });
  }
}
