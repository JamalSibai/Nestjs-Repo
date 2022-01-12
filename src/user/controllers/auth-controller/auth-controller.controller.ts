import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserInput } from 'src/user/inputs/create.input';
import { UsersService } from 'src/user/user.service';

@ApiTags('Auth Apis')
@Controller('auth-controller')
export class AuthControllerController {
  constructor(private readonly usersService: UsersService) {}

  @Post('Register')
  @ApiCreatedResponse({
    description: 'Register',
  })
  @ApiUnauthorizedResponse({
    description: 'User Already exists',
  })
  @ApiBody({ type: UserInput })
  @ApiBearerAuth()
  async Register(@Body() input: UserInput) {
    return await this.usersService.createUser(input);
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    try {
      return await this.usersService.login({ email, password });
    } catch (err) {
      console.error(err);
    }
  }
}
